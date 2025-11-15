import React from 'react'
import DoctorCard from '../DoctorCard'
import { MyGlobalContext } from '../../context/GlobalContext'
import { useContext } from 'react'

const DoctorsMainPage = () => {

  const {doctors, loading} = useContext(MyGlobalContext)

  // Skeleton Card Component using pure Tailwind
  const SkeletonCard = () => (
    <div className='border border-gray-300 rounded-xl overflow-hidden w-full max-w-xs shadow-sm'>
      <div className='relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
        {/* Image skeleton with aspect ratio matching DoctorCard */}
        <div className='h-64 w-full bg-gradient-to-br from-gray-200 to-gray-300'></div>
      
        {/* Shimmer effect overlay */}
        <div className='absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent'></div>
      </div>
    
      <div className='p-4 space-y-3 bg-white'>
        {/* Available status skeleton */}
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-gray-300 animate-pulse'></div>
          <div className='h-3.5 w-24 bg-gray-300 rounded-full'></div>
        </div>
      
        {/* Doctor name skeleton */}
        <div className='h-5 w-48 bg-gray-300 rounded-md'></div>
      
        {/* Speciality skeleton */}
        <div className='h-3.5 w-36 bg-gray-300 rounded-full'></div>
      </div>
    </div>
  )

  return (
    <div className='pt-22'>
        <h1 className='text-center font-medium text-3xl'>Top Doctors to Book</h1>
        <p className='text-center'>Simply browse through our extensive list of trusted doctors</p>

        <div className='grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-8 pt-12'>
            {loading ? (
              // Show 10 skeleton cards while loading
              Array(10).fill(0).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              // Show actual doctor cards when loaded
              doctors.map((doctor, index) => (
                <DoctorCard key={index} value={doctor}></DoctorCard>
              ))
            )}
        </div>
    </div>
  )
}

export default DoctorsMainPage