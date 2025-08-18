import React, { useEffect, useState } from 'react'
import { doctors } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { useContext } from 'react'
import { MyGlobalContext } from '../context/GlobalContext'
import { NavLink } from 'react-router-dom'

const MyAppointments = () => {

  const {appointmentUrl, token} = useContext(MyGlobalContext)
  
  useEffect(() => {
    const endPoint = appointmentUrl + '/my-appointments'
    const headers = {
      Authorization : `Bearer ${token}`
    }
    const fetchMyAppointments = async () => {
      const response = await axios.get(endPoint, {headers})
      setAppointments(response.data.appointments)
    }

    fetchMyAppointments()
  }, [])

  const [appointments, setAppointments] = useState([])
  console.log(appointments, '----doctor')

  return (
    <div className='mt-8'>

      <p className='font-bold text-xl'>My appointments</p>

        {
            !appointments && (
            <div className='bg-blue-100 h-screen flex flex-col justify-center items-center gap-3'>
              <h1 className='text-2xl font-semibold'>No Appointments Booked yet</h1>
              <NavLink to={'/'}>
                <button className='bg-primary px-8 py-3 text-white font-bold rounded-full cursor-pointer hover:px-12 hover:bg-btnHover'>See all doctors</button>
              </NavLink>
              
            </div>
          )
        }

        {
          appointments?.map((doctor, index) => {
            console.log(doctor)
            return (
              <AppointmentCard key={index} value={doctor} />
            )
          })
        }

        
        
      
      
    </div>
  )
}

const AppointmentCard = (doctor) => {
  doctor = doctor.value
  
  const dateFormate = (slotDate) => {
    const dateformat = new Date(slotDate)
    console.log(dateformat)
    const year = dateformat.getFullYear()
    const date = dateformat.getDate()
    const month = dateformat.toLocaleDateString("en-US", {month: "long"})
    console.log(month, 'month')

    return `${date} - ${month} - ${year}`
  }
  return (
    <div className='flex flex-col  mt-8'>
          <div className='flex gap-4 border-y py-7 border-gray-400'>
            <div>
              <img className=' bg-[#EAEFFF] w-44 object-cover' src={doctor.doctorData.image} alt="" />
            </div>

            <div className='flex-1  md:flex  md:justify-between text-[#5E5E5E]'>
              <div className='md:self-center' >
                <p className='font-bold'>{doctor.doctorData.name}</p>
                <p className='text-sm '>{doctor.doctorData.speciality}</p>

                
                <div className='text-sm'>
                  <p><span className='font-bold'>Date & Time</span>: {dateFormate(doctor.slotDate)} | {doctor.slotTime}</p>
                </div>
              </div>

              <div className='flex flex-col gap-2 mt-3 md:self-end'>
                <button className='ring rounded-xs py-1'>Pay Online</button>
                <button className='ring rounded-sx py-1 md:px-4' >Cancel Appointment</button>
              </div>
            </div>
          </div>
          
      </div>
  )
}

export default MyAppointments
