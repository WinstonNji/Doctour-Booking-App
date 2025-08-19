import React, { useContext } from 'react'
import { assets as adminAssets } from '../../assets/assets_admin/assets'
import { MyGlobalContext } from '../../context/GlobalContext'

const AppointmentsTable = ({ 
  appointments = [], 
  title = "Appointments", 
  caption = "History of all appointments made by patients.",
  showActions = true,
  maxRows = null 
}) => {

    console.log(appointments)
  
  const displayAppointments = maxRows ? appointments.slice(0, maxRows) : appointments

  return (
    <div className="w-full">
      {title && <p className='font-bold mb-4'>{title}</p>}
      
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
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TableRow = ({ appointment, idx, showActions }) => {
  const { formatDate } = useContext(MyGlobalContext)

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
              <p className='text-green-400 font-semibold '>Active</p>
            )}
        </div>        
      </td>
      <td>
        {!appointment.cancelled ? (
            <div className='flex justify-center '>
                {appointment.payment ? (
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
            <div className='flex justify-center cursor-pointer'>
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