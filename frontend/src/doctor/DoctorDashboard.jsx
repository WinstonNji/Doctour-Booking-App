import React from 'react'
import { useContext } from 'react'
import { MyGlobalContext } from '../context/GlobalContext'
import DashboardInfo from '../admin/components/Dashboard-info'
import AppointmentsTable from '../admin/components/AppointmentsTable'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MyDoctorContext } from '../context/DoctorContext'

function DoctorDashboard() {
  const {fetchDoctorAppointments,appointments} = useContext(MyDoctorContext)


  useEffect(() => {
    fetchDoctorAppointments()
  }, [])


  return (
    <div className='ml-48 pt-24 pl-6 min-h-screen  bg-gray-50'>
        <DashboardInfo></DashboardInfo>
        <AppointmentsTable 
          appointments={appointments}
          showActions = {false}
          maxRows={5}
           caption = {"History of all appointments made by patients."}
        />
    </div>
  )
}

export default DoctorDashboard
