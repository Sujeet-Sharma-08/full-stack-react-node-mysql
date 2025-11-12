import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import apiConnector from "../api/apiConnector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";


const Navbar = () => {

  const token = useSelector((state) => state.user.token)
  // console.log("token from navbar", token)

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleProfile() {
    setVisible(!visible);
  }

  const handleLogout = async () => {
    try {
      const response = await apiConnector.post('/user/logout');

      toast.success(response.data.message)
      dispatch(logoutUser(null));
      setVisible(false);
      navigate('/')

    } catch (error) {
      toast.error(error.response.data.message || "Logout Failed!")
    }
  }

  return (
    <div>
      <nav className="w-full bg-gray-900 text-white py-4 shadow-md p-5">
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


          <div className="flex gap-10">
            {!token &&
              <Link
                to="/login"
                className="group flex items-center justify-center gap-2 h-10 w-32 rounded-3xl bg-amber-300 text-black font-semibold transition-all duration-300 px-4"
              >
                <span>Sign in</span>

                {/* Arrow animation */}
                <HiArrowLongRight
                  className="text-xl transform transition-all duration-300 group-hover:translate-x-1"
                />
              </Link>
            }

            {token &&
              <div onClick={handleProfile} className="text-xl mt-2 cursor-pointer hover:text-yellow-400 transition duration-300">
                <FaUser />
              </div>}
          </div>
        </div>
      </nav >

      {/* profile-menu  */}
      {
        visible && (
          <div className="absolute right-6 top-18 bg-white shadow-md rounded-sm w-28 z-50">
            <Link onClick={() => setVisible(false)} to={'/profile'} className="flex gap-2 items-center justify-center py-2 hover:bg-gray-200 hover:rounded-sm ">
              <div>
                < FaRegUser />
              </div>
              <div>
                < div className="block text-center">Profile</div>
              </div>
            </Link>

            <Link onClick={handleLogout} className="flex gap-2 items-center justify-center py-2 hover:bg-gray-200 hover:rounded-sm">
              <div><IoLogOutOutline /></div>
              <div className="block text-center">Logout</div>
            </Link>
          </div>
        )
      }
    </div >
  );
};

export default Navbar;
