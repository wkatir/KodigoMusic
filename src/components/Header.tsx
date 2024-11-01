import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center group space-x-2 text-xl font-semibold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent transition-all duration-200 hover:scale-[1.02]"
          >
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-lg">
              Kodigo
            </span>
            <span className="text-gray-700 dark:text-gray-200">Music</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 border-l border-gray-200 dark:border-gray-600 pl-2">
              Log in with another account
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
