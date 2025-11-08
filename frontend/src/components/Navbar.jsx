import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide"> <Link to={"/"}>LOGO</Link></div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-yellow-400 transition duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-yellow-400 transition duration-300"
            >
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-between gap-5">
          <div className="text-xl"><Link to={'/login'}>Sign in</Link></div>
          <div className="text-xl"><Link to={'/register'}>Sign up</Link></div>
        </div>

        {/* User Icon */}
        <div className="text-xl cursor-pointer hover:text-yellow-400 transition duration-300">
          <FaUser />
        </div>


      </div>
    </nav>
  );
};

export default Navbar;
