import React, { useContext, useMemo } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { MyGlobalContext } from '../../context/GlobalContext'

function DashboardInfo() {
  const { doctors = [], appointmentData = [] } = useContext(MyGlobalContext)

  const { doctorCount, activeAppointmentCount, uniqueActivePatientCount } = useMemo(() => {
    const doctorCountCalc = Array.isArray(doctors) ? doctors.length : 0

    const activeAppointments = Array.isArray(appointmentData)
      ? appointmentData.filter(appt => appt && appt.cancelled === false)
      : []

    const activeAppointmentCountCalc = activeAppointments.length

    const uniquePatientIds = new Set(
      activeAppointments
        .map(appt => appt?.userData?._id)
        .filter(Boolean)
    )

    const uniqueActivePatientCountCalc = uniquePatientIds.size

    return {
      doctorCount: doctorCountCalc,
      activeAppointmentCount: activeAppointmentCountCalc,
      uniqueActivePatientCount: uniqueActivePatientCountCalc,
    }
  }, [doctors, appointmentData])

  return (
    <div className='flex flex-wrap w-full gap-8 mb-6'>
      <div className='flex pr-18 rounded-sm gap-3 bg-[#F6F8FF] items-center justify-center  shadow-sm overflow-hidden'>
        <img className='w-12' src={assets.doctor_icon} alt="" />
        <div>
            <p>{doctorCount}</p>
            <p className='text-gray-400'>Doctors</p>
        </div>

      </div>
      
      <div className='flex pr-18 rounded-sm gap-3 bg-[#F6F8FF] items-center justify-center  shadow-sm overflow-hidden'>
        <img className='w-8' src={assets.appointments_icon} alt="" />
        <div>
            <p>{activeAppointmentCount}</p>
            <p className='text-gray-400'>Appointments</p>
        </div>
      </div>
        

      <div className='flex pr-18 rounded-sm gap-3 bg-[#F6F8FF] items-center justify-center  shadow-sm overflow-hidden'>
        <img className='w-12' src={assets.patients_icon} alt="" />

        <div>
            <p>{uniqueActivePatientCount}</p>
            <p className='text-gray-400'>Patients</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardInfo
