import React, { useState } from 'react'
import DoctorCard from '../DoctorCard'
import { MyGlobalContext } from '../../context/GlobalContext'
import { useContext } from 'react'

const DoctorsMainPage = () => {

  const {doctors} = useContext(MyGlobalContext)

  return (
    <div className='pt-22'>
        <h1 className='text-center font-medium text-3xl'>Top Doctors to Book</h1>
        <p className='text-center'>Simply browse through our extensive list of trusted doctors</p>

        <div className='grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-8 pt-12 '>
            {doctors.map((doctor,index) => {
                return (
                    <DoctorCard key={index} value={doctor}></DoctorCard>                    
                )
            })}
        </div>
    </div>
  )
}

export default DoctorsMainPage
