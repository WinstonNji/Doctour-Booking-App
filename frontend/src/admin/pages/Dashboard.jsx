import React from 'react'
import DashboardInfo from '../components/Dashboard-info'
import LatestAppointment from '../components/LatestAppointment'

function Dashboard() {
  return (
    <div className='ml-48 pt-24 pl-6 pr-6 h-screen bg-gray-50'>
    
        <DashboardInfo />
        <LatestAppointment />
      </div>
  )
}

export default Dashboard
