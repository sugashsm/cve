'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function CveDetail() {
  const { id } = useParams();
  const [cveData, setCveData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCveDetail() {
      try {
        const response = await fetch(`/api/cve/${id}`);
        const data = await response.json();
        setCveData(data);
      } finally {
        setLoading(false);
      }
    }
    fetchCveDetail();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );

  if (!cveData) return <div className="p-4">No data found</div>;


  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{cveData.cveId}</h1>

      {/* Description Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Description:</h2>
        <p className="text-gray-700">{cveData.description}</p>
      </div>

      {/* CVSS V2 Metrics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">CVSS V2 Metrics:</h2>
        <div className="mb-4 flex gap-8">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Severity:</span>
            <span>{cveData.severity || 'LOW'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Score:</span>
            <span className="text-red-600">{cveData.baseScore || '7.2'}</span>
          </div>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Vector String:</span>
          <span className="ml-2">{cveData.vectorString || 'AV:L/AC:L/Au:N/C:C/I:C/A:C'}</span>
        </div>

        {/* Metrics Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Access Vector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Access Complexity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authentication</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidentiality Impact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Integrity Impact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Availability Impact</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm">{cveData.accessVector || 'LOCAL'}</td>
                <td className="px-6 py-4 text-sm">{cveData.accessComplexity || 'LOW'}</td>
                <td className="px-6 py-4 text-sm">{cveData.authentication || 'NONE'}</td>
                <td className="px-6 py-4 text-sm">{cveData.confidentialityImpact || 'COMPLETE'}</td>
                <td className="px-6 py-4 text-sm">{cveData.integrityImpact || 'COMPLETE'}</td>
                <td className="px-6 py-4 text-sm">{cveData.availabilityImpact || 'COMPLETE'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Scores Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Scores:</h2>
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="font-semibold">Exploitability Score:</span>
            <span>{cveData.exploitabilityScore || '3.9'}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Impact Score:</span>
            <span>{cveData.impactScore || '10'}</span>
          </div>
        </div>
      </div>

      {/* CPE Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">CPE:</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criteria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Match Criteria ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vulnerable</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(cveData.cpe || [{ 
                criteria: 'cpe:2.3:o:sun:solaris:*:*:x86:*:*:*:*:*',
                matchCriteria: 'FEEC0C5A-4A6E-403C-B929-D1EC8B0FE2A8',
                vulnerable: 'Yes'
              }]).map((cpe, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-mono">{cpe.criteria}</td>
                  <td className="px-6 py-4 text-sm">{cpe.matchCriteria}</td>
                  <td className="px-6 py-4 text-sm">{cpe.vulnerable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}