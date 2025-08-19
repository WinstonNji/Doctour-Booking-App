import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MyGlobalContext } from '../context/GlobalContext'

const MyAppointments = () => {
  const { appointmentUrl, token } = useContext(MyGlobalContext)
  const [appointments, setAppointments] = useState([])

  const fetchMyAppointments = async () => {
    try {
      const endPoint = appointmentUrl + '/my-appointments'
      const headers = { Authorization: `Bearer ${token}` }
      const response = await axios.get(endPoint, { headers })
      setAppointments(response.data.appointments)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch appointments')
    }
  }

  console.log(appointments)

  useEffect(() => {
    fetchMyAppointments()
  }, [])

  return (
    <div className="mt-8">
      <p className="font-bold text-xl">My appointments</p>

      {!appointments && (
        <div className="bg-blue-100 h-screen flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl font-semibold">No Appointments Booked yet</h1>
          <NavLink to={'/'}>
            <button className="bg-primary px-8 py-3 text-white font-bold rounded-full cursor-pointer hover:px-12 hover:bg-btnHover transition-all duration-150 ease-in-out">
              See all doctors
            </button>
          </NavLink>
        </div>
      )}

      {appointments?.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          refreshAppointments={fetchMyAppointments}
        />
      ))}
    </div>
  )
}

const AppointmentCard = ({ appointment, refreshAppointments }) => {
  const { clientUrl, token, fetchAllDoctors, formatDate } = useContext(MyGlobalContext)

  const cancelAppointment = async (appointmentId) => {
    try {
      const endPoint = clientUrl + '/cancel-appointment'
      const headers = { Authorization: `Bearer ${token}` }
      const response = await axios.post(endPoint, { appointmentId }, { headers })
      if (response.data.success) {
        toast.success(response.data.message)
        refreshAppointments()
        fetchAllDoctors()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred')
    }
  }

  

  return (
    <div className="flex flex-col mt-8">
      <div className="flex gap-4 border-y py-7 border-gray-400">
        <div>
          <img
            className="bg-[#EAEFFF] w-44 object-cover"
            src={appointment.doctorData?.image}
            alt={appointment.doctorData?.name}
          />
        </div>

        <div className="flex-1 md:flex md:justify-between text-[#5E5E5E]">
          <div className="md:self-center">
            <p className="font-bold text-lg">{appointment.doctorData?.name}</p>
            <p>{appointment.doctorData?.speciality}</p>

            <div>
              <p>
                <span className="font-bold">Date & Time</span>: {formatDate(appointment.slotDate)} |{' '}
                {appointment.slotTime}
              </p>
              <p>
                <span className="font-bold">Amount</span>: ${appointment.amount}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3 md:self-end">
            <button
              className={`ring rounded-xs py-1 bg-primary active:bg-btnHover text-white font-bold cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out ${
                appointment.cancelled ? 'hidden' : ''
              }`}
            >
              Pay Online
            </button>
            <button
              disabled ={appointment.cancelled}
              onClick={() => cancelAppointment(appointment._id)}
              className={`text-white font-bold ring rounded-sx py-1 md:px-4 cursor-pointer ${
                appointment.cancelled
                  ? 'bg-red-500'
                  : 'bg-red-400 hover:bg-red-600 active:bg-red-500'
              }`}
            >
              {appointment.cancelled ? 'Appointment Cancelled' : 'Cancel Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAppointments
