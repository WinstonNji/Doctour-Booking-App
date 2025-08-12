import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Dashboard from './admin/pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// admin imports
import AdminNavbar from './admin/components/Navbar'
import SideBar from './admin/components/SideBar'
import Add_Doctor from './admin/pages/Add_Doctor'
import All_Appointments from './admin/pages/All_Appointments'
import All_Doctors from './admin/pages/All_Doctors'
import AdminLogin from './admin/auth/AdminLogin'


const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className={`${!isAdminRoute ? 'mx-4 sm:mx-[10%]' : '' }`}>
      {!isAdminRoute && <NavBar></NavBar>}

      {isAdminRoute && <AdminNavbar /> }
      {isAdminRoute && <SideBar /> }
  

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors  />} />
        <Route path='/doctors/:speciality' element={<Doctors  />} />
        <Route path='/login' element={<Login  />} />
        <Route path='/about' element={<About  />} />
        <Route path='/contact' element={<Contact  />} />
        <Route path='/my-profile' element={<MyProfile  />} />
        <Route path='/my-appointments' element={<MyAppointments  />} />
        <Route path='/appointment/:docId' element={<Appointment  />} />

        {/* Admin Routes */}
        <Route path='/admin-dashboard' element={<Dashboard />}></Route>
        <Route />
        <Route path='/admin-add-doctor' element={<Add_Doctor />}></Route>
        <Route />
        <Route path='/admin-appointments' element={<All_Appointments />} ></Route>
        <Route path='/admin-doctor-list' element={<All_Doctors />}></Route>
        <Route path='/admin-login' element={<AdminLogin />}></Route>
      </Routes>

      {!isAdminRoute && <Footer></Footer>}
      <ToastContainer />
    </div>
  )
}

export default App
