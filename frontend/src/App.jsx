import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects'
import ProtectedRoute from './protectedRoute/ProtectedRoute'
import ForgetPassword from './pages/ForgetPassword'
import VerifyOtp from './pages/VerifyOtp'
import ResetPassword from './pages/ResetPassword'
import { useDispatch } from 'react-redux'
import { setUserData, logoutUser } from './redux/slices/userSlice.js'
import { useEffect, useState } from 'react'
import apiConnector from './api/ApiConnector.jsx'
import DashBoard from './pages/DashBoard.jsx'
import Users from './pages/Users.jsx'
import AllIdeas from './pages/AllIdeas.jsx'
import Settings from './pages/Settings.jsx'


function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiConnector.get("/user/me");
        dispatch(setUserData(res.data.user));
      } catch (error) {
        // Only clear user data if it's an auth error, not a network error
        if (error.response?.status === 401) {
          dispatch(logoutUser());
        } else {
          // Keep existing user data for network errors
          console.error("Error fetching user:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Add a proper loading component
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* protected routes */}
        <Route path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

        <Route path='/projects' element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        } />

        {/* Forgot passowrd pages */}
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Dash borad pages */}
        <Route path='/dashboard' element={<DashBoard />} >
          <Route index path='users' element={<Users />} />
          <Route path='all-ideas' element={<AllIdeas />} />
          <Route path='settings' element={<Settings />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  )
}

export default App