import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { assets as frontendAssets } from '../../assets/assets_frontend/assets'

function LatestAppointment() {
  return (
    <div className='mt-10 sm:w-full lg:w-[75%] border border-gray-300 px-8 py-4 bg-white'>
        <p className='font-bold py-4 border-b-2 border-b-gray-300'>Latest Appointment</p>

        <div className='mt-8 flex justify-between'>
            <div className='flex gap-4'>
                <img className='rounded-full w-12 object-contain' src={frontendAssets.profile_pic} alt="" />
                <div>
                    <p>Dr.Richard James</p>
                    <p className='text-gray-400'> Booking on 24th July 2024 </p>  
                </div>
            </div>
            <img className='cursor-pointer' src={assets.cancel_icon} alt="" />
        </div>
        

    </div>
  )
}

export default LatestAppointment
