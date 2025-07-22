import React from 'react'
import { doctors } from '../assets/assets_frontend/assets'


const MyAppointments = () => {

  return (
    <div className='mt-8'>

      <p>My appointments</p>


      <div className='flex flex-col  mt-8'>
          <div className='flex gap-4 border-y py-7 border-gray-400'>
            <div>
              <img className=' bg-[#EAEFFF] w-44 object-cover' src={doctors[14].image} alt="" />
            </div>

            <div className='flex-1  md:flex  md:justify-between text-[#5E5E5E]'>
              <div className='md:self-center' >
                <p className='font-bold'>Dr.Amelia Hill</p>
                <p className='text-sm '>Dermatologist</p>

                <p className='text-sm font-bold '>Address:</p>
                <div className='text-sm'>
                  <p>14th Cross, Richmond</p>
                  <p>Circle, Ring Road, London</p>
                  <p><span className='font-bold'>Date & Time</span>: 18 Aug 2025 | 13:00</p>
                </div>
              </div>

              <div className='flex flex-col gap-2 mt-3 md:self-end'>
                <button className='ring rounded-xs py-1'>Pay Online</button>
                <button className='ring rounded-sx py-1 md:px-4' >Cancel Appointment</button>
              </div>
            </div>
          </div>
          
      </div>
      
    </div>
  )
}

export default MyAppointments
