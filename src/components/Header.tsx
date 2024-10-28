import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-white/10">
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-xl font-bold hover:from-purple-500 hover:to-pink-600 transition-colors"
          >
            Kodigo Music By Wilmer Salazar
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
