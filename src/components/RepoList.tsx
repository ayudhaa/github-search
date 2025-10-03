import { useState, useEffect } from "react";

export default function RepoList({ repos, darkMode }: { repos: any[]; darkMode?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [repos]);

  if (!repos.length) return <p className={`p-2 ${darkMode ? 'text-white' : 'text-black'}`}>Loading...</p>;
  const totalPages = Math.ceil(repos.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentRepos = repos.slice(start, start + perPage);

  return (
    <div className="p-2 space-y-2">
      {currentRepos.map(repo => (
        <div
          key={repo.id}
          className={`border rounded p-2 flex justify-between ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
          }`}
        >
          <div>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
              {repo.name}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {repo.description || "No description"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className={darkMode ? 'text-white' : 'text-black'}>{repo.stargazers_count}</span>
            <span>⭐</span>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1 
                ? "bg-gray-300" 
                : darkMode 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-500 text-white"
            }`}
          >
            Prev
          </button>
          <span className={darkMode ? 'text-white' : 'text-black'}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages 
                ? "bg-gray-300" 
                : darkMode 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}