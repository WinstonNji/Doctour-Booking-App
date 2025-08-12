import React, { useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'


const NavBar = () => {

    return (
        <>  
        
            < MobileMenu></MobileMenu>
            <DesktopMenu></DesktopMenu>
            
            <hr />
        </>
    )
}

const MobileMenu = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
    <>
        <div className='flex justify-between  py-4  relative md:hidden' >
            
            <img className='w-38' src={assets.admin_logo} alt="" />            

            <div className='flex justify-center'>
                <UserMenu />
                
                <img onClick={() => setMenuOpen(true)} className='w-10' src={assets.hamburgerMenu} alt="" />

                {/* Menu Bar */}
                <div className={`fixed px-8 bg-white left-0 right-0 top-0 pt-3 bottom-0 z-50  ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                    <div className='flex justify-between'>
                        <img src={assets.admin_logo} alt="" />
                        <img onClick={() => setMenuOpen(false)} src={assets.cancel_icon} alt="" />
                    </div>

                    <div className='menuNav pt-5 bg-white' >
                        <ul className={`flex flex-col gap-3 items-center`}>
                            <NavLink to='/' className='a'>
                                <li onClick={()=> setMenuOpen(false)} >HOME</li>
                            </NavLink>
                            <NavLink to='/doctors'  className='a'>
                                <li onClick={()=> setMenuOpen(false)}>ALL DOCTORS</li>
                            </NavLink>
                            <NavLink to='/about'  className='a'>
                                <li onClick={()=> setMenuOpen(false)}>ABOUT</li>
                            </NavLink>
                            <NavLink to="/contact"  className='a'>
                                <li onClick={()=> setMenuOpen(false)}>CONTACT</li>
                            </NavLink>
                        </ul>
                    </div>
                    
                </div> 
                
            
            </div>
        </div>
        
    </> )
}

const DesktopMenu = () => {
    return (
    <>
        <div className='hidden justify-between items-center p-4 md:flex' >
            {/* Image */}
                
            <img className='w-48' src={assets.admin_logo} alt="" />
                

            {/* Navs */}
            <div>
                <ul className='desktopNav flex gap-4'>
                    <NavLink to='/' className='a'>
                        <li >HOME</li>
                    </NavLink>
                    <NavLink to='/doctors'  className='a'>
                        <li >ALL DOCTORS</li>
                    </NavLink>
                    <NavLink to='/about'  className='a'>
                        <li>ABOUT</li>
                    </NavLink>
                    <NavLink to="/contact"  className='a'>
                        <li>CONTACT</li>
                    </NavLink>
                </ul>
            </div>

            {/* User Menu */}
            <UserMenu />
        </div>
    </>)
}

const UserMenu = () => {

    return (

    <div className='group flex relative'>
        <img className='w-10' src={assets.upload_area} alt="" />
        <img className='w-4' src={assets.dropDown_icon} alt="" />

        <div>
            <ul className='flex-col gap-2 p-2 hidden group-hover:flex absolute top-[42px] right-[10%] bg-gray-100 w-42 group'>
                <NavLink to='/my-profile'>
                    <li className='hover:font-bold hover:text-primary'>
                        My Profile
                    </li>
                </NavLink>

                <NavLink to='/my-appointments'>
                    <li className='hover:font-bold hover:text-primary'>
                        My appointments
                    </li>
                </NavLink>

                <NavLink>
                    <li className='hover:font-bold hover:text-primary'>
                        Logout
                    </li>
                </NavLink>

                <NavLink to='/admin-dashboard'>
                    <li className='hover:font-bold hover:text-primary'>
                        Admin
                    </li>
                </NavLink>
            </ul>
        </div>
    </div>

    )
}


export default NavBar
