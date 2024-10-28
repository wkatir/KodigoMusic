import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl transition-colors duration-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Log in with another account / Kodigo Music.
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
