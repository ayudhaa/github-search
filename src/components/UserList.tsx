import { useState } from "react";
import RepoList from "./RepoList";

export default function UserList({ users, darkMode }: { users: any[]; darkMode?: boolean }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [repos, setRepos] = useState<Record<string, any[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const toggleUser = async (username: string) => {
    if (expanded === username) {
      setExpanded(null);
      return;
    }
    setExpanded(username);

    if (!repos[username]) {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await res.json();
      setRepos(prev => ({ ...prev, [username]: data }));
    }
  };

  const totalPages = Math.ceil(users.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentUsers = users.slice(start, start + perPage);

  return (
    <div>
      <p className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
        Showing users {start + 1}-{Math.min(start + perPage, users.length)} of {users.length}
      </p>
      
      {currentUsers.map(user => (
        <div key={user.id} className={`mb-2 border rounded ${
          darkMode ? 'border-gray-600' : 'border-gray-300'
        }`}>
          <button
            onClick={() => toggleUser(user.login)}
            className={`flex justify-between items-center w-full p-2 rounded-t ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            <span>{user.login}</span>
            <span>{expanded === user.login ? "▲" : "▼"}</span>
          </button>
          {expanded === user.login && (
            <RepoList repos={repos[user.login] || []} darkMode={darkMode} />
          )}
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