'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CveList() {
  const router = useRouter();
  const [cves, setCves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchData();
  }, [resultsPerPage, currentPage]);

  async function fetchData() {
    try {
      const startIndex = (currentPage - 1) * resultsPerPage;
      const response = await fetch(`/api/cve?startIndex=${startIndex}&resultsPerPage=${resultsPerPage}`);
      const data = await response.json();
      setCves(data.vulnerabilities);
      setTotalRecords(data.totalResults);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch CVEs');
      setLoading(false);
    }
  }

  const handleRowClick = (cveId) => {
    router.push(`/cves/${cveId.toLowerCase()}`);
  };
  
  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }


  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );



  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>CVE List</h1>
      
      <div className='flex justify-between items-center mb-4'>
        <div className='text-sm text-gray-600'>
          Total Records: {totalRecords.toLocaleString()}
        </div>
        {/* Results per page dropdown */}
      </div>

      <div className='overflow-x-auto shadow-md rounded-lg'>
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Identifier</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Published Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Last Modified</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {cves.map((cve) => (
              <tr 
                key={cve.cveId}
                onClick={() => handleRowClick(cve.cveId)}
                className='hover:bg-gray-50 cursor-pointer transition-colors duration-200'
              >
                <td className='px-6 py-4 whitespace-nowrap'>{cve.cveId}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{cve.identifier}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {formatDate(cve.publishedDate)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {formatDate(cve.lastModifiedDate)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${cve.vulnStatus === 'Analyzed' ? 'bg-green-100 text-green-800' : 
                    cve.vulnStatus === 'Awaiting Analysis' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                    {cve.vulnStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
    {/* Replace or update the existing pagination div with this: */}
    <div className='mt-4 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-600'>Results per page:</label>
          <select
            value={resultsPerPage}
            onChange={(e) => {
              setResultsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing results per page
            }}
            className='border rounded px-2 py-1 text-sm'
          >
            {[10, 25, 50, 75, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Previous
          </button>
          
          <div className='flex items-center gap-1'>
            <span className='text-sm text-gray-600'>Page</span>
            <input
              type='number'
              value={currentPage}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value > 0 && value <= Math.ceil(totalRecords / resultsPerPage)) {
                  setCurrentPage(value);
                }
              }}
              className='border rounded w-16 px-2 py-1 text-sm'
            />
            <span className='text-sm text-gray-600'>
              of {Math.ceil(totalRecords / resultsPerPage)}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalRecords / resultsPerPage)))}
            disabled={currentPage >= Math.ceil(totalRecords / resultsPerPage)}
            className='px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
      </div>
    </div>

  );
}

