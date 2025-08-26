import React, { useContext, useState } from 'react'
import { assets as adminAssets } from '../../assets/assets_admin/assets'
import { MyGlobalContext } from '../../context/GlobalContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../../components/Loading'
import {useLocation} from 'react-router-dom'
import { assets } from '../../assets/assets_admin/assets.js'
import { MyDoctorContext } from '../../context/DoctorContext.jsx'
import StatusBadge from './StatusBadge.jsx'

const AppointmentsTable = ({ 
  appointments = [], 
  title = "Appointments", 
  caption = "History of all appointments made by patients.",
  showActions = true,
  maxRows = null 
}) => {

  const isDoctorRoute = useLocation().pathname.startsWith('/doctor')
  const displayAppointments = maxRows ? appointments.slice(0, maxRows) : appointments

  const {clientUrl, token, appointmentUrl} = useContext(MyGlobalContext)

  const [completingId, setCompletingId] = useState(null)
  const [cancellingId, setCancellingId] = useState(null)

  async function completeAppointment (appointmentId){
    try {
      setCompletingId(appointmentId)
      const endPoint = appointmentUrl + '/complete-appointment'
      const headers = {
          Authorization : `Bearer ${token}`
      }

      const response = await axios.post(endPoint, {appointmentId} ,{headers})
      
      if(!response.data.success){
        toast.error(response.data.message)
        return
      }

      toast.success(response.data.message)
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('An error occurred')
      return
      
    } finally {
      setCompletingId(null)
    }
       
    }

  const cancelAppointment = async (appointmentId) => 
  {
    try {
      setCancellingId(appointmentId)
      const endPoint = clientUrl + '/cancel-appointment'
      const headers = { Authorization: `Bearer ${token}` }
      const response = await axios.post(endPoint, { appointmentId }, { headers })
      if (response.data.success) {
        toast.success(response.data.message)
        window.location.reload()
      } else {
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
    <div className="w-full">
      {title && <p className='font-bold mb-4'>{title}</p>}
      
      {/* Mobile Card View */}
      <div className="block md:hidden px-4">
        {displayAppointments.map((appointment, idx) => (
          <MobileAppointmentCard 
            key={idx} 
            appointment={appointment} 
            idx={idx + 1}
            showActions={showActions}
            cancelAppointment={cancelAppointment}
            completeAppointment={completeAppointment}
          />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className='table table-auto border border-gray-400 min-w-1.5 lg:w-[99%] mt-4 bg-white'>
          {caption && (
            <caption className="caption-top text-sm mb-2 text-gray-500">
              {caption}
            </caption>
          )}
          
          <thead className='border-b border-gray-400'>
            <tr className='py-4'>
              <th className='py-4 px-2'>#</th>
              <th>Patient</th>
              {!isDoctorRoute && <th>Department</th>}
              <th>Gender</th>
              <th>Date & Time</th>
              {!isDoctorRoute && <th>Doctor</th>}
              <th>Fees</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Completion Status</th>
              {showActions && <th>Actions</th>}
              <th>
                <div className='w-1/2'>Complete</div>
              </th>
            </tr>
          </thead>

          <tbody className='text-center text-gray-500'>
            {displayAppointments.map((appointment, idx) => (
              <TableRow 
                key={idx} 
                appointment={appointment} 
                idx={idx + 1}
                showActions={showActions}
                cancelAppointment={cancelAppointment}
                completeAppointment={completeAppointment}
                completingId={completingId}
                cancellingId={cancellingId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const MobileAppointmentCard = ({ appointment, idx, showActions, cancelAppointment, completeAppointment }) => {
  const isDoctorRoute = useLocation().pathname.startsWith('/doctor')
  const { formatDate} = useContext(MyGlobalContext)
  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId)
  }

  return (
    <div className="bg-white border border-gray-400 rounded-lg shadow-sm mb-4 p-4">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-gray-500">#{idx}</span>
        <div className='flex justify-center '>
          <StatusBadge type="general" appointment={appointment} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Patient Section */}
        <div className="border-l-4 border-blue-400 pl-3">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">PATIENT</p>
          <div className="flex items-center gap-3">
            <img 
              className='w-12 rounded-full' 
              src={appointment?.userData?.image} 
              alt="" 
            />
            <div>
              <p className="font-bold text-gray-800 text-lg">{appointment?.userData?.name}</p>
              <p className="text-sm text-gray-500">{appointment?.userData?.gender}</p>
            </div>
          </div>
        </div>

        {/* Doctor Section */}
        {!isDoctorRoute && (
          <div className="border-l-4 border-green-400 pl-3">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">DOCTOR</p>
            <div className="flex items-center gap-3">
              <img 
                className='w-12 rounded-full' 
                src={appointment?.doctorData?.image} 
                alt="" 
              />
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg">{appointment?.doctorData?.name}</p>
                <p className="text-sm text-gray-600">{appointment?.doctorData?.speciality}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Appointment Details */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-700">Date & Time</p>
            <p className="text-sm font-medium text-gray-800">
              {formatDate(appointment.slotDate)} | {appointment.slotTime}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-700">Consultation Fee</p>
            <p className="text-lg font-bold text-green-600">${appointment?.amount}</p>
          </div>
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">PAYMENT</p>
            <StatusBadge type="payment" appointment={appointment} />
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">COMPLETION</p>
            <StatusBadge type="completion" appointment={appointment} />
          </div>
        </div>

        {/* Actions - Hidden for completed appointments */}
        {showActions && !appointment.cancelled && !appointment.isCompleted && (
          <div className="flex justify-center pt-3 border-t border-gray-200">
            <button onClick={() => handleCancel(appointment._id)} className='flex justify-center cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-all'>
              <img 
                className='self-center' 
                src={adminAssets.cancel_icon} 
                alt="Cancel" 
              />
            </button>
          </div>
        )}

        {/* Completion Icon */}
        {!appointment.isCompleted && !appointment.cancelled ? (
          <div onClick={()=> completeAppointment(appointment._id)} className='mt-4 cursor-pointer hover:border-secondary border border-primary p-2 rounded-lg flex justify-center active:scale-95 transition-all'>
            <img className='w-10' src={assets.completed_icon} alt="completedIcon" />
          </div>
        ) : appointment.isCompleted && (
          <div className='mt-4 flex justify-center p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#22c55e">
              <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
            </svg>
          </div>
        )}       
      </div>
    </div>
  )
}

const TableRow = ({ appointment, idx, showActions, cancelAppointment, completeAppointment, completingId, cancellingId }) => {
  const isDoctorRoute = useLocation().pathname.startsWith('/doctor')
  const { formatDate } = useContext(MyGlobalContext)
  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId)
  }
  return (
    <tr className='hover:bg-secondary hover:text-gray-600 transition-all ease-in-out duration-150'>
      <td className='py-3'>{idx}</td>
      <td className='py-3'>
        <div className='flex justify-center'>
          <div className='flex items-center gap-2'>
            <img 
              className='w-12 rounded-full' 
              src={appointment?.userData?.image} 
              alt="patient image" 
            />
            <p>{appointment?.userData?.name}</p>
          </div>
        </div>
      </td>
      {!isDoctorRoute && <td className='py-3'>{appointment?.doctorData?.speciality}</td>}
      <td className='py-3'>{appointment?.userData?.gender}</td>
      <td className='py-3'>{formatDate(appointment.slotDate)} | {appointment.slotTime}</td>
      
      {!isDoctorRoute && (
        <td className='py-3'>
          <div className='flex justify-center py-4'>
            <div className='flex items-center gap-2'>
              <img 
                className='w-12 rounded-full' 
                src={appointment?.doctorData?.image} 
                alt="doctorImage" 
              />
              <p>{appointment?.doctorData?.name}</p>
            </div>
          </div>
        </td>
      )}
        
      <td className='py-3'>${appointment?.amount}</td>
      <td className='py-3'><StatusBadge type="general" appointment={appointment} /></td>
      <td className='py-3'><StatusBadge type="payment" appointment={appointment} /></td>
      <td className='py-3'><StatusBadge type="completion" appointment={appointment} /></td>
        
      {/* Actions - Hidden for completed and cancelled appointments */}
      {showActions && (
        <td className={appointment.cancelled || appointment.isCompleted ? 'hidden py-3' : 'py-3'}>
          <div onClick={() => handleCancel(appointment._id)} className='flex justify-center cursor-pointer'>
            {cancellingId === appointment._id ? (
              <span className='inline-block w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin'></span>
            ) : (
              <img 
                className='self-center' 
                src={adminAssets.cancel_icon} 
                alt="Cancel" 
              />
            )}
          </div>
        </td>
      )}
      <td className='py-3'>
        {
          !appointment.cancelled && !appointment.isCompleted ? (
           <div onClick={()=> completeAppointment(appointment._id)} className='cursor-pointer flex justify-center items-center hover:border-primary border border-secondary p-2 rounded-lg active:scale-90 active:bg-white  transition-all mr-5 '>
            {completingId === appointment._id ? (
              <span className='inline-block w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin'></span>
            ) : (
              <img className='w-6 self-center' src={assets.completed_icon} alt="completedIcon" />
            )}
          </div>
          ) : appointment.isCompleted && (
            <div className='flex justify-center items-center mr-5'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#22c55e">
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
            </div>
          )
        }
      </td>
    </tr>
  )
}

export default AppointmentsTable