import GithubSearch from './components/GithubSearch';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>
      <GithubSearch />
    </div>
  );
}
