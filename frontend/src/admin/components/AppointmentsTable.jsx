import React, { useContext } from 'react'
import { assets as adminAssets } from '../../assets/assets_admin/assets'
import { MyGlobalContext } from '../../context/GlobalContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AppointmentsTable = ({ 
  appointments = [], 
  title = "Appointments", 
  caption = "History of all appointments made by patients.",
  showActions = true,
  maxRows = null 
}) => {

  
  const displayAppointments = maxRows ? appointments.slice(0, maxRows) : appointments

  const {clientUrl, token} = useContext(MyGlobalContext)

  const cancelAppointment = async (appointmentId) => 
  {
    console.log(appointmentId)
    try {
      const endPoint = clientUrl + '/cancel-appointment'
      const headers = { Authorization: `Bearer ${token}` }
      const response = await axios.post(endPoint, { appointmentId }, { headers })
      console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.message)
        window.location.reload()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred')
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
          />
        ))}
      </div>

      {/* Original Desktop Table - unchanged */}
      <div className="hidden md:block">
        <table className='table table-auto border border-gray-400 min-w-1.5 lg:w-[95%] mt-4 bg-white'>
          {caption && (
            <caption className="caption-top text-sm mb-2 text-gray-500">
              {caption}
            </caption>
          )}
          
          <thead className='border-b border-gray-400'>
            <tr className='py-4'>
              <th className='py-4 px-2'>#</th>
              <th>Patient</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Date & Time</th>
              <th>Doctor</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Completion Status</th>
              {showActions && <th>Actions</th>}
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
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const MobileAppointmentCard = ({ appointment, idx, showActions, cancelAppointment }) => {
  const { formatDate, clientUrl, token} = useContext(MyGlobalContext)
  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId)
  }

  return (
    <div className="bg-white border border-gray-400 rounded-lg shadow-sm mb-4 p-4">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-gray-500">#{idx}</span>
        <div className='flex justify-center '>
            {appointment.cancelled ? (
              <p className='text-red-400 font-semibold'>Cancelled</p>
            ) : (
              <p className='text-orange-400 font-semibold '>Active</p>
            )}
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
            <p className="text-lg font-bold text-green-600">${appointment?.doctorData?.fee}</p>
          </div>
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">PAYMENT</p>
            {!appointment.cancelled ? (
                appointment.payment ? (
                <p className='text-green-600 font-bold'>Paid</p>
                ) : (
                <p className='text-orange-400 font-bold'>Pending</p>
                )
            ) : (
                <p className='text-red-400 font-bold'>Cancelled</p>
            )}
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-xs font-semibold text-gray-600 mb-1">COMPLETION</p>
            {!appointment.cancelled ? (
                appointment.isCompleted ? (
                <p className='text-green-400 font-bold'>Complete</p>
                ) : (
                <p className='text-orange-400 font-bold'>Pending</p>
                )
            ) : (
                <p className='text-red-400 font-bold'>Cancelled</p>
            )}
          </div>
        </div>


        {/* Actions */}
        
          {showActions && !appointment.cancelled && (
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
          
        
      </div>
    </div>
  )
}

const TableRow = ({ appointment, idx, showActions, cancelAppointment }) => {
  const { formatDate } = useContext(MyGlobalContext)

  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId)
  }

  return (
    <tr className='hover:bg-secondary hover:text-gray-600 transition-all ease-in-out duration-150'>
      <td>{idx}</td>
      <td>
        <div className='flex justify-center'>
          <div className='flex items-center gap-2'>
            <img 
              className='w-12 rounded-full' 
              src={appointment?.userData?.image} 
              alt="" 
            />
            <p>{appointment?.userData?.name}</p>
          </div>
        </div>
      </td>
      <td>{appointment?.doctorData?.speciality}</td>
      <td>{appointment?.userData?.gender}</td>
      <td>{formatDate(appointment.slotDate)} | {appointment.slotTime}</td>
      <td>
        <div className='flex justify-center py-4'>
          <div className='flex items-center gap-2'>
            <img 
              className='w-12 rounded-full' 
              src={appointment?.doctorData?.image} 
              alt="" 
            />
            <p>{appointment?.doctorData?.name}</p>
          </div>
        </div>
      </td>
      <td>${appointment?.doctorData?.fee}</td>
      <td>
        <div className='flex justify-center '>
            {appointment.cancelled ? (
              <p className='text-red-400 font-semibold'>Cancelled</p>
            ) : (
              <p className='text-primary font-semibold '>Active</p>
            )}
        </div>        
      </td>
      <td>
        {!appointment.cancelled ? (
            <div className='flex justify-center '>
                {appointment.payment ? (
                <p className='text-green-600 font-semibold'>Paid</p>
                ) : (
                <p className='text-orange-400 font-semibold '>Pending</p>
                )}
            </div>
        ) : (
        <div className='flex justify-center '>
            <p className='text-red-400 font-semibold'>Cancelled</p>
        </div>
        )}
        
      </td>
    <td>
        {!appointment.cancelled ? (
            <div className='flex justify-center '>
                {appointment.isCompleted ? (
                <p className='text-green-400 font-semibold'>Paid</p>
                ) : (
                <p className='text-orange-400 font-semibold '>Pending</p>
                )}
            </div>
        ) : (
        <div className='flex justify-center '>
            <p className='text-red-400 font-semibold'>Cancelled</p>
        </div>
        )}
      </td>
        
        
        {showActions && (
            <td className={appointment.cancelled ? 'hidden' : null}>
            <div onClick={() => handleCancel(appointment._id)} className='flex justify-center cursor-pointer'>
                <img 
                className='self-center' 
                src={adminAssets.cancel_icon} 
                alt="Cancel" 
                />
            </div>
            </td>
        )}
    </tr>
  )
}

export default AppointmentsTable