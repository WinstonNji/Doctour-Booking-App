import React from 'react'
import { Link } from 'react-router-dom'

const DoctorCard = (doctors) => {
    doctors = doctors.value

  return (
    <div>
        <Link to={`/appointment/${doctors._id}`}>
            <div  className='border-1 border-primary rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 ease-in-out  group '  >
                <div className='flex bg-secondary items-center group-hover:bg-primary transition-colors duration-200 ease-in-out'>
                    <img className='object-contain' src={doctors.image} alt="" />
                </div>

                <div className='p-4'>
                    <div className='flex items-center gap-2 text-green-500 font-semibold'>
                        <p className='h-2 w-2 rounded-full bg-green-500'></p>
                        <p>Available</p>
                    </div>
                    
                    <p className='font-bold truncate'>{doctors.name}</p>
                    <p className='text-sm font-extralight'>{doctors.speciality}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default DoctorCard
