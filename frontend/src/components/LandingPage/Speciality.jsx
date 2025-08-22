import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { specialityData } from '../../assets/assets_frontend/assets'
import { Link, Links } from 'react-router-dom'

const Speciality = () => {
  return (
    <div className='flex flex-col items-center pt-12 gap-4'>
        <h1 className='font-medium text-3xl'>Find by Speciality</h1>
        <p className='text-center'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free. </p>

        <div className='flex overflow-x-auto  max-w-11/12 md:max-w-fit   items-center gap-6'>
            {specialityData.map((speciality, index) => {
                return (
                    <Link key={index} to={`/doctors/${speciality.speciality}`}>
                        <div className='flex flex-col items-center hover:-translate-y-2 transition-transform duration-150 ease-in-out' key={index}>
                            <img className='max-w-20 md:max-w-28' src={speciality.image} alt="" />
                            <div>
                                <p className='text-sm whitespace-nowrap'>{speciality.speciality}</p>
                            </div>
                        
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default Speciality
