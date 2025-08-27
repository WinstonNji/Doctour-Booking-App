import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function AdminNavbar() {

  const isAdminLogin = useLocation().pathname.startsWith('/admin-login')
  const navigate = useNavigate()

  function AdminLogout (){
    
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  const isDemo = typeof window !== 'undefined' && localStorage.getItem('demo_admin') === 'true'

  return (
    <div className={`fixed left-0 right-0 flex px-8 justify-between ring py-3 border-amber-100 z-50 overflow-hidden bg-white`}>
      <img src={assets.admin_logo} alt="" />
      <div className='flex items-center gap-4'>
        {isDemo && (
          <span className='text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold'>Demo Mode</span>
        )}
        <button onClick={()=> AdminLogout()} className={`${isAdminLogin ? 'hidden' : 'bg-primary px-8 h-fit self-center font-semibold text-white cursor-pointer  rounded-full py-2 hover:px-12 transition-all duration-150 ease-in-out hover:bg-primary'} `}>Logout</button>
      </div>
    </div>
  )
}

export default AdminNavbar
