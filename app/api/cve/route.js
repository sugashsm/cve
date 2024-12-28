import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils/mongodb';
import Cve from '@/lib/models/cve';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function GET(request) {
  await connectToDB();
  
  const { searchParams } = new URL(request.url);
  const startIndex = parseInt(searchParams.get('startIndex')) || 0;
  const resultsPerPage = parseInt(searchParams.get('resultsPerPage')) || 20;
  
  try {
    // Check if we have recent data in the database
    const cachedData = await Cve.find({
      lastUpdated: { 
        $gt: new Date(Date.now() - CACHE_DURATION) 
      }
    })
    .skip(startIndex)
    .limit(resultsPerPage)
    .sort({ publishedDate: -1 });

    // If we have recent cached data, return it
    if (cachedData.length > 0) {
      const totalResults = await Cve.countDocuments({
        lastUpdated: { 
          $gt: new Date(Date.now() - CACHE_DURATION) 
        }
      });

      return NextResponse.json({
        totalResults,
        resultsPerPage,
        startIndex,
        vulnerabilities: cachedData,
        source: 'database',
        timestamp: new Date().toISOString()
      });
    }

    // If no recent data, fetch from NVD API
    const headers = {
      'Accept': 'application/json',
      'User-Agent': 'Your-App-Name/1.0'
    };

    const response = await fetch(
      `${process.env.BASE_URL}?startIndex=${startIndex}&resultsPerPage=${resultsPerPage}`, 
      { headers }
    );

    const data = await response.json();

    // Format and store the data
    const formattedData = data.vulnerabilities?.map((vulnerability) => {
      const metrics = vulnerability.cve?.metrics?.cvssMetricV2?.[0] || {};
      const cvssData = metrics?.cvssData || {};
      const configuration = vulnerability.cve?.configurations?.[0]?.nodes?.[0]?.cpeMatch?.[0] || {};

      return {
        cveId: vulnerability.cve?.id || '',
        identifier: vulnerability.cve?.sourceIdentifier || '',
        description: vulnerability.cve?.descriptions?.find(d => d.lang === 'en')?.value || 'No description available',
        publishedDate: vulnerability.cve?.published || '',
        lastModifiedDate: vulnerability.cve?.lastModified || '',
        vulnStatus: vulnerability.cve?.vulnStatus || '',
        baseScore: cvssData.baseScore || null,
        vectorString: cvssData.vectorString || null,
        accessVector: cvssData.accessVector || null,
        accessComplexity: cvssData.accessComplexity || null,
        authentication: cvssData.authentication || null,
        confidentialityImpact: cvssData.confidentialityImpact || null,
        integrityImpact: cvssData.integrityImpact || null,
        availabilityImpact: cvssData.availabilityImpact || null,
        exploitabilityScore: metrics.exploitabilityScore || null,
        impactScore: metrics.impactScore || null,
        vulnerable: configuration.vulnerable || null,
        criteria: configuration.criteria || null,
        matchCriteria: configuration.matchCriteriaId || null,
        lastUpdated: new Date() // Add timestamp for cache management
      };
    }) || [];

    // Bulk upsert to database
    if (formattedData.length > 0) {
      const bulkOps = formattedData.map(item => ({
        updateOne: {
          filter: { cveId: item.cveId },
          update: { $set: item },
          upsert: true
        }
      }));

      await Cve.bulkWrite(bulkOps);
    }

    return NextResponse.json({
      totalResults: data.totalResults || 0,
      resultsPerPage: data.resultsPerPage || resultsPerPage,
      startIndex: data.startIndex || startIndex,
      vulnerabilities: formattedData,
      source: 'api',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching CVE data:', error);
    
    // If API fails, try to return stale cache as fallback
    try {
      const staleData = await Cve.find({})
        .skip(startIndex)
        .limit(resultsPerPage)
        .sort({ publishedDate: -1 });

      if (staleData.length > 0) {
        const totalResults = await Cve.countDocuments();
        return NextResponse.json({
          totalResults,
          resultsPerPage,
          startIndex,
          vulnerabilities: staleData,
          source: 'stale_cache',
          timestamp: new Date().toISOString()
        });
      }
    } catch (dbError) {
      console.error('Database fallback failed:', dbError);
    }

    return NextResponse.json({ 
      error: 'Failed to fetch CVE data', 
      details: error.message,
      timestamp: new Date().toISOString()
    }, { 
      status: 500 
    });
  }
}