import { getSpotifyLoginUrl } from "../services/auth";

const Login = () => {
  const handleLogin = () => {
    window.location.href = getSpotifyLoginUrl();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
            />
          </svg>
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          Kodigo Music
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Connect with your Spotify account
        </p>
        <button
          onClick={handleLogin}
          className="w-full px-5 py-2 mt-6 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
        >
          Continue with Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
