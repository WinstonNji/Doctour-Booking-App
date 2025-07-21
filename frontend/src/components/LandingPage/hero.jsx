import React from 'react'
import { assets } from '../../assets/assets_frontend/assets.js'

const Hero = () => {
  return (
    <div className='flex flex-col bg-primary px-6  mt-4 rounded-xl gap-12 md:flex-row  md:px-20 md:pt-16 md:h-[70vh]'>
        <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='font-extrabold text-3xl  text-white md:self-start md:text-[40px]'>Book Appointment With Trusted Doctors</h1>

            <div className='flex flex-col gap-3 md:flex-row md:self-start text-white items-center '>
                <img className='w-32 self-center' src={assets.group_profiles} alt="" />
                <p className='text-sm md:whitespace-pre-wrap xl:w-82'>Simply brows through our extensive list of trusted doctors, schedule your appointment hassle-free</p>
            </div>  

            <button className='flex self-center items-center gap-2 py-2 px-8 bg-white rounded-3xl text-gray-600 text-sm md:self-start hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer'>Book appointment <span><img src={assets.arrow_icon} alt="" /></span></button>
        </div>  

        <div className='flex self-center relative'>
            <img className='w-92 self-center md:bottom-0  md:w-3xl' src={assets.header_img} alt="" />
        </div>
        
    </div>
  )
}

export default Hero
