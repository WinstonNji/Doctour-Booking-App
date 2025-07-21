import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '../assets/assets_frontend/assets'
import { assets } from '../assets/assets_frontend/assets'
import DoctorCard from '../components/DoctorCard'


const Appointment = () => {
  const {docId} = useParams()
  
  const [doctor,setDoctor] = useState()
  const [relatedSpecialities, setSpeciality] = useState(null)


  useEffect(() => {
    setDoctor ( doctors.find((doctor) => {
        if(doctor._id === docId ){
            setSpeciality(doctor.speciality)
          return doctor
        }
      })
    )
  }, [docId])
  return (
    <div className='mt-6'>
      <div className='flex flex-col items-start gap-5 text-black md:flex-row '>
        <div className='flex justify-center w-full lg:w-auto'> 
          <img className='bg-primary rounded-2xl object-cover sm:max-w-72 ' src={doctor?.image} alt="" />
        </div>

        <div>
          {/* Doctor Details */}
            <div className='  bg-white p-6 rounded-3xl border border-gray-400  py-7 '>
              <div className='xl:w-[95%] 2xl:w-[75%] gap-3 flex flex-col'>
                <div className='flex gap-4'>
                  <h1 className='font-bold text-3xl'>{doctor?.name}</h1>
                  <img src={assets.verified_icon} alt="" />
                </div>
                
                <div className='flex gap-3 items-center text-gray-600'>
                  <p>{`${doctor?.degree} - ${doctor?.speciality}`}</p>
                  <p className='px-2 ring-1 rounded-full whitespace-nowrap'>{doctor?.experience}</p>
                </div>
                
                <div className='flex gap-2 font-semibold'>
                  <p>About</p>
                  <img  src={assets.info_icon} alt="" />
                </div>
                
                <p className='text-gray-600'>{doctor?.about}</p>
                <p className='font-semibold '>Appointment: ${doctor?.fees}</p>
              </div>
          </div>
        
          {/* Doctor Time Slots */}
          <div className='mt-7'>
            <p className='font-medium text-gray-600'>Booking slots</p>
          <div>
            {/* Date */}
            <div className='flex gap-4'>
              
            </div>
            {/* Time of the day */}
            <div>

            </div>
          </div>
            

            <button className='px-16 py-3 bg-primary cursor-pointer text-white rounded-2xl font-medium '>Book and appointment </button>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-medium'>Related Soctors</h2>
          <p className='text-gray-600'> simply browse through our extensive list of trusted doctors.</p>
        </div>
        

        <div className='flex gap-6 pt-5 t-5 gap-y-6  mt-8'>
          {doctors.filter(doctor => {
            if(doctor.speciality === relatedSpecialities && doctor._id !== docId){
              
              return doctor
            }
            }).map((doctor, index) => {
            
              return (
                <div className='lg:size-1/4'>
                  <DoctorCard value={doctor} key={index} />
                </div>

                
              )
            })}
        </div>
        
      </div>
      
    </div>
  )
}

export default Appointment
