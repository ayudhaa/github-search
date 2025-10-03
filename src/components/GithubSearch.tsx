import { useState } from "react";
import Notiflix from "notiflix";
import UserList from "./UserList";

export default function GithubSearch({ darkMode }: { darkMode?: boolean }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async () => {
    if (!query) {
      Notiflix.Report.info(
        'Please enter a username first',
        '',
        'OK'
      );
    } else {
      setLoading(true);
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await res.json();
      setUsers(data.items || []);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchUsers();
    }
  };

  return (
    <div className={`max-w-md mx-auto p-4 rounded shadow ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter username"
          className={`w-full border rounded p-2 mb-2 ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-300' 
              : 'bg-white text-black border-gray-300'
          }`}
          autoComplete="off"
        />
        <button
          onClick={searchUsers}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <img 
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" 
            alt="Loading..." 
            className="w-16 h-16"
          />
        </div>
      )}

      {users.length > 0 && (
        <UserList users={users} darkMode={darkMode} />
      )}
    </div>
  );
}