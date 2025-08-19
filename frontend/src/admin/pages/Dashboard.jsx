import React, { useEffect, useContext } from 'react'
import DashboardInfo from '../components/Dashboard-info'
import { MyGlobalContext } from '../../context/GlobalContext'
import AppointmentsTable from '../components/AppointmentsTable'

function Dashboard() {
  const { appointmentData, fetchAllAppointments } = useContext(MyGlobalContext)

  useEffect(() => {
    fetchAllAppointments()
  }, [])

  return (
    <div className='ml-48 pt-24 pl-6 pr-6 min-h-screen bg-gray-50'>
      <DashboardInfo />
      
      <AppointmentsTable 
        appointments={appointmentData}
        title="Latest Appointments"
        caption="Recent appointments overview."
        showActions={false}
        maxRows={4}
      />
    </div>
  )
}

export default Dashboard