import React from 'react'
import AppointmentsTable from '../admin/components/AppointmentsTable'
import { useContext, useEffect } from 'react'
import { MyDoctorContext } from '../context/DoctorContext'

function DoctorAppointments() {

  const {appointments, fetchDoctorAppointments} = useContext(MyDoctorContext)
  

  useEffect(() => {
    fetchDoctorAppointments()
  }, [])


  return (
    <div className='ml-48 pt-24 pl-6 min-h-screen  bg-gray-50'>
      <AppointmentsTable
        appointments={appointments}
      />
    </div>
  )
}

export default DoctorAppointments
