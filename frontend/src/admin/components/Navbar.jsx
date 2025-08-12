import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useLocation } from 'react-router-dom'

function AdminNavbar() {

  const isAdminLogin = useLocation().pathname.startsWith('/admin-login')
  console.log(isAdminLogin)

  return (
    <div className={`fixed left-0 right-0 flex px-8 justify-between ring py-3 border-amber-100 z-50 overflow-hidden bg-white`}>
      <img src={assets.admin_logo} alt="" />
      <button  className={`${isAdminLogin ? 'hidden' : ''}`}>Logout</button>
    </div>
  )
}

export default AdminNavbar
