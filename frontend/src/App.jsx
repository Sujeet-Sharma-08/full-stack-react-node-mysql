import { Route, Routes } from 'react-router-dom'
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


function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* protected route */}
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


        <Route path='/forgot-password' 
        element={
            // <ProtectedRoute>
              <ForgetPassword />
            // </ProtectedRoute>
            } 
            />

            <Route path='/verify-otp' element={<VerifyOtp/>}/>

            <Route path='/reset-password' element={<ResetPassword/>}/>
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
