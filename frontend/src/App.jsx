import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// User Imports
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Dashboard from './admin/pages/Dashboard'
import Verification from './pages/Verification'

// Protected Route
import ProtectedRoutes from './components/ProtectedRoutes';
import DoctorProtectRoute from './components/DoctorProtectRoute';

// admin imports
import AdminNavbar from './admin/components/Navbar'
import SideBar from './admin/components/SideBar'
import Add_Doctor from './admin/pages/Add_Doctor'
import All_Appointments from './admin/pages/All_Appointments'
import All_Doctors from './admin/pages/All_Doctors'
import Doctor_Edit from './admin/pages/Doctor_Edit'
import Login from './auth/Login';

// doctour imports
import DoctorDashboard from './doctor/DoctorDashboard';
import DoctorAppointments from './doctor/DoctorAppointments';
import DoctorProfile from './doctor/DoctorProfile';

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin')
  const isLogin = location.pathname.startsWith('/login')
  const isVerificationPage = location.pathname.startsWith('/verify')
  const isDoctorRoute = location.pathname.startsWith('/doctor-')
  return (
    <div className={`${!isAdminRoute && !isLogin && !isVerificationPage && !isDoctorRoute ? 'mx-[10%] ' : 'overflow-x-hidden overflow-y-hidden' }`}>
      {!isAdminRoute && !isVerificationPage && !isDoctorRoute && <NavBar></NavBar>}

      {(isAdminRoute || isDoctorRoute) && <AdminNavbar /> }
      {(isAdminRoute || isDoctorRoute) && <SideBar /> }
  

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login  />} />
        <Route path='/doctors' element={<Doctors  />} />
        <Route path='/doctors/:speciality' element={<Doctors  />} />
        <Route path='/login' element={<Login  />} />
        <Route path='/about' element={<About  />} />
        <Route path='/contact' element={<Contact  />} />
        <Route path='/my-profile' element={<MyProfile  />} />
        <Route path='/my-appointments' element={<MyAppointments  />} />
        <Route path='/appointment/:docId' element={<Appointment  />} />
        <Route path='/verify' element={<Verification />}/>

        {/* Admin Routes */}
        <Route element={< ProtectedRoutes/>}>
          <Route path='/admin-dashboard' element={<Dashboard />}></Route>
          <Route path='/admin-add-doctor' element={<Add_Doctor />}></Route>
          <Route path='/admin-appointments' element={<All_Appointments />} ></Route>
          <Route path='/admin-doctor-list' element={<All_Doctors />}></Route>
          <Route path='/admin-doctor/:id' element={<Doctor_Edit />}></Route>
        </Route>

        <Route path='/admin-login' element={<Login />}></Route>

        {/* Doctour Route */}
        <Route element={<DoctorProtectRoute />}>
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />}></Route>
        </Route>
        
      </Routes>

      

      {!isAdminRoute && !isLogin && !isVerificationPage && !isDoctorRoute && <Footer></Footer>}
      <ToastContainer />
    </div>
  )
}

export default App
