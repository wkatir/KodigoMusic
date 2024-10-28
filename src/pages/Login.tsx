import { getSpotifyLoginUrl } from "../services/auth";

const Login = () => {
  const handleLogin = () => {
    window.location.href = getSpotifyLoginUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Kodigo Music
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Connect with your Spotify account
          </p>
        </div>
        <button
          onClick={handleLogin}
          className="w-full flex justify-center py-3 px-4 rounded-xl bg-green-600/90 hover:bg-green-600 backdrop-blur-sm transition-all duration-300 text-white font-medium hover:shadow-lg hover:shadow-green-500/20"
        >
          Continue with Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
