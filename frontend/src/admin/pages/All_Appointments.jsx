import React, { useEffect, useContext } from 'react'
import { MyGlobalContext } from '../../context/GlobalContext'
import AppointmentsTable from '../components/AppointmentsTable'

function All_Appointments() {
  const { fetchAllAppointments, appointmentData } = useContext(MyGlobalContext)

  useEffect(() => {
    fetchAllAppointments()
  }, [])

  return (
    <div className='ml-48 pt-24 py-7 pl-6 min-h-screen bg-gray-50'>
      <AppointmentsTable 
        appointments={appointmentData}
        title="All Appointments"
        caption="History of all appointments made by patients."
        showActions={true}
      />
    </div>
  )
}

export default All_Appointments