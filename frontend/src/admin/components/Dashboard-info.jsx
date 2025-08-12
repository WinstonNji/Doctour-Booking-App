import React from 'react'
import { assets } from '../../assets/assets_admin/assets'

function DashboardInfo() {
  return (
    <div className='flex flex-wrap w-full gap-8'>
      <div className='flex pr-18 rounded-sm gap-3 bg-[#F6F8FF] items-center justify-center  shadow-sm overflow-hidden'>
        <img className='w-12' src={assets.doctor_icon} alt="" />
        <div>
            <p>14</p>
            <p className='text-gray-400'>Doctors</p>
        </div>

      </div>
      
      <div className='flex pr-18 rounded-sm gap-3 bg-[#F6F8FF] items-center justify-center  shadow-sm overflow-hidden'>
        <img className='w-8' src={assets.appointments_icon} alt="" />
        <div>
            <p>2</p>
            <p className='text-gray-400'>Appointments</p>
        </div>
      </div>
        

      <div className='flex pr-18 rounded-sm gap-3 bg-[#F6F8FF] items-center justify-center  shadow-sm overflow-hidden'>
        <img className='w-12' src={assets.patients_icon} alt="" />

        <div>
            <p>5</p>
            <p className='text-gray-400'>Patients</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardInfo
