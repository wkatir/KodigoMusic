import { getSpotifyLoginUrl } from "../services/auth";

const Login = () => {
  const handleLogin = () => {
    window.location.href = getSpotifyLoginUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="flex flex-col items-center max-w-sm mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <div className="p-4 text-white rounded-full bg-gradient-to-r from-green-400 to-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-800 dark:text-white">
          Kodigo Music
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Connect with your Spotify account
        </p>
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 mt-8 text-base font-medium text-white transition-all duration-200 bg-gradient-to-r from-green-500 to-green-400 rounded-xl hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Continue with Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
