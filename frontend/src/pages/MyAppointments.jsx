import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MyGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

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

  

  useEffect(() => {
    fetchMyAppointments()
  }, [])

  return (
    <div className="mt-8">
      <p className="font-bold text-xl">My appointments</p>

      {!appointments && (
        <div className="bg-blue-100 h-screen flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl font-semibold">No Appointments Booked yet</h1>
          <NavLink to={'/doctors'}>
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
  const { clientUrl, token, fetchAllDoctors, formatDate, userData, paymentUrl} = useContext(MyGlobalContext)
  const [cancellingId, setCancellingId] = useState(null)
  const [paying, setPaying] = useState(false)

  async function makePayment(amount, appointmentId){
    if(paying) return
    setPaying(true)
    const email = userData.email
    const name= userData.name
    const endPoint = paymentUrl + `/initiate-payment`
    const data = {amount, email, name, appointmentId }
    const headers = {
      Authorization : `Bearer ${token}`
    }
    const response = await axios.post(endPoint, data,{headers} )

    if(!response.data.success){
      toast.error(response.data.message)
      refreshAppointments()
      return
    }

    const checkoutUrl = response.data.response.data.link
    window.open(checkoutUrl, "_blank ")
    toast.success("Redirecting to payment gateway")
    setPaying(false)
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      setCancellingId(appointmentId)
      const endPoint = clientUrl + '/cancel-appointment'
      const headers = { Authorization: `Bearer ${token}` }
      const response = await axios.post(endPoint,  {appointmentId}, { headers })
      if (response.data.success) {
        toast.success(response.data.message)
        refreshAppointments()
        fetchAllDoctors()
      } else {
        refreshAppointments()
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred')
    } finally {
      setCancellingId(null)
    }
  }

  

  return (
    <div className="flex flex-col mt-8">
      <div className={`flex gap-4 border-y px-4 py-7 border-gray-400 ${
        appointment.isCompleted ? 'bg-green-50 border-green-200' : 
        appointment.cancelled ? 'bg-red-50 border-red-200' :
        appointment.payment ? 'bg-blue-50 border-blue-200' : ''
      }`}>
        <div className="relative">
          <img
            className="bg-[#EAEFFF] w-44 object-cover"
            src={appointment.doctorData?.image}
            alt={appointment.doctorData?.name}
          />
          {/* Status Badge Overlay */}
          {appointment.isCompleted && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Completed
            </div>
          )}
          {appointment.cancelled && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Cancelled
            </div>
          )}
          {!appointment.isCompleted && !appointment.cancelled && appointment.payment && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Paid
            </div>
          )}
        </div>

        <div className="flex-1 md:flex md:justify-between text-[#5E5E5E]">
          <div className="md:self-center">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">{appointment.doctorData?.name}</p>
              {appointment.isCompleted && (
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#22c55e">
                  <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
              )}
              {appointment.cancelled && (
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ef4444">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              )}
              {!appointment.isCompleted && !appointment.cancelled && appointment.payment && (
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#3b82f6">
                  <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q-33 0-56.5 23.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/>
                </svg>
              )}
            </div>
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

            {!appointment.payment && (
              <>
                {/* Pay Online */}
                <button
                  className={`ring py-2 rounded-2xl bg-primary active:bg-btnHover text-white font-bold cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out ${
                    appointment.cancelled || appointment.isCompleted ? 'hidden' : ''
                  }`}
                  onClick={() => makePayment(appointment.amount, appointment._id)}
                >
                  Pay Online
                </button>

                {/* Cancel Appointment */}
                <button
                  disabled ={appointment.cancelled}
                  onClick={() => cancelAppointment(appointment._id)}
                  className={`text-white font-bold ring rounded-sx py-2 rounded-2xl md:px-4 ${
                    appointment.cancelled
                      ? 'bg-red-500 cursor-default'
                      : appointment.isCompleted
                      ? 'hidden'
                      : 'bg-red-400 hover:bg-red-600 active:bg-red-500 cursor-pointer'
                  }`}
                >
                  {appointment.cancelled ? 'Appointment Cancelled' : (cancellingId === appointment._id ? 'Cancelling…' : 'Cancel Appointment')}
                </button>
              </>
            )}

            {appointment.payment && !appointment.isCompleted && (
              <button className='bg-blue-400 text-white font-bold py-2 rounded-2xl px-12' disabled>
                  Appointment Paid
              </button>
            )}

            {appointment.isCompleted && (
              <button className='bg-green-600 text-white font-bold py-2 rounded-2xl px-8' disabled>
                Appointment Completed
              </button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAppointments