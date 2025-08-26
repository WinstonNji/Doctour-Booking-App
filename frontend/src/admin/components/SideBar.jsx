import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function SideBar() {

    const isAdminRoute = useLocation().pathname.startsWith('/admin-login')
    const isDoctorRoute = useLocation().pathname.startsWith('/doctor-')

  return (
    <div className={`fixed top-19 w-48 left-0 bottom-0 border-r-2 border-r-gray-300  flex flex-col gap-6 pt-3 bg-white overflow-hidden ${isAdminRoute ? 'hidden' : ''}`}>
        <NavLink to={`${!isDoctorRoute ? '/admin-dashboard' : '/doctor-dashboard' }`} >
            <div className='flex gap-2 pl-2  sideBarNav'>
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
            </div>
        </NavLink>

        <NavLink to={`${!isDoctorRoute ? '/admin-appointments' : '/doctor-appointments' }`}>
            <div className='flex gap-2 pl-2  sideBarNav'>
                <img color='#00000' className='text-black to-black' src={assets.appointment_icon} alt="" />
                <p>Appointments</p>
            </div>
        </NavLink>


        {isDoctorRoute && (
            <NavLink to={'/doctor-profile'}>
                <div className='flex gap-2 pl-2  sideBarNav'>
                    <img src={assets.profileIcon} alt="" />
                    <p>Profile</p>
                    
                </div>
            </NavLink>
        )}
        
        
        {!isDoctorRoute && (
            <>
                <NavLink to='/admin-add-doctor'>
                    <div className='flex gap-2 pl-2 sideBarNav'>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </div>
                </NavLink>
            
                <NavLink to='/admin-doctor-list'>
                    <div className='flex gap-2 pl-2 sideBarNav'>
                        <img src={assets.people_icon} alt="" />
                        <p>Doctor List</p>
                    </div>
                </NavLink>
            </>
            
        )}
        
    
    </div>
  )
}

export default SideBar
