import React, { useState } from 'react'
import { doctors as docArray } from '../../assets/assets_frontend/assets'
import DoctorCard from '../../components/DoctorCard'

function All_Doctors() {
    const [doctors, setDoctors] = useState(docArray)
  return (
    <div className=' ml-48 pt-24 pl-6 pr-6 h-screen bg-gray-50 pb-20'>
        <div className='flex flex-wrap justify-center gap-2 gap-y-6 pb-20'>
            {doctors.map((doctor,index) => (
                <div className=''>
                    <DoctorCard key={index} value={doctor} />
                </div>
                
            ))}
        </div>
    </div>
  )
}

export default All_Doctors
