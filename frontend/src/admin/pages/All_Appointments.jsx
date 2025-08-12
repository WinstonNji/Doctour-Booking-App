import React from 'react'
import LatestAppointment from '../components/LatestAppointment'
import { assets } from '../../assets/assets_frontend/assets'
import { assets as adminAssets } from '../../assets/assets_admin/assets'

function All_Appointments() {
  return (
    <div className='ml-48  pt-24 pl-6 h-screen bg-gray-50'>
      <p className='font-bold'>All Appointments</p>

      <table className='table-auto table min-w-1.5 lg:w-[85%] ring ring-gray-300 mt-4 bg-white' >
        <thead className='border-b border-gray-400'>
            <tr className='py-4'>
                <th className='py-4 px-2'>#</th>
                <th>Patient</th>
                <th>Department</th>
                <th>Age</th>
                <th>Date & Time</th>
                <th>Doctor</th>
                <th>Fees</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody className='text-center mt-9 pt-8 divide-y text-gray-500'>
            <tr className='hover:bg-secondary hover:text-gray-600 transition-all ease-in-out duration-150'>
                <td >1</td>
                <td className='flex justify-center'>
                    <div className='flex items-center gap-2'>
                        <img className='w-12 rounded-full' src={assets.profile_pic} alt="" />
                        <p>Richard James</p>
                    </div>
                </td>
                <td>Dentist</td>
                <td>28</td>
                <td>24th July, 2024, 10AM</td>
                <td className='flex justify-center py-4 '>
                    <div className='flex items-center gap-2'>
                        <img className='w-12 rounded-full' src={assets.profile_pic} alt="" />
                        <p>Dr.Richard James</p>
                    </div>
                </td>
                <td>
                    $50
                </td>
                <td className='flex justify-center'><img className='self-center' src={adminAssets.cancel_icon} alt="" /></td>
            </tr>

            <tr>
                <td >1</td>
                <td className='flex justify-center'>
                    <div className='flex items-center gap-2'>
                        <img className='w-12 rounded-full' src={assets.profile_pic} alt="" />
                        <p>Richard James</p>
                    </div>
                </td>
                <td>Dentist</td>
                <td>28</td>
                <td>24th July, 2024, 10AM</td>
                <td className='flex justify-center py-4 '>
                    <div className='flex items-center gap-2'>
                        <img className='w-12 rounded-full' src={assets.profile_pic} alt="" />
                        <p>Dr.Richard James</p>
                    </div>
                </td>
                <td>
                    $50
                </td>
                <td className='flex justify-center'><img className='self-center' src={adminAssets.cancel_icon} alt="" /></td>
            </tr>
        </tbody>
      </table>

    </div>
  )
}

export default All_Appointments
