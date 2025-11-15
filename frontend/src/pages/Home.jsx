import React from 'react'
import Hero from '../components/LandingPage/hero'
import Speciality from '../components/LandingPage/Speciality'
import DoctorsMainPage from '../components/LandingPage/DoctorsMainPage'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Speciality></Speciality>
      <DoctorsMainPage></DoctorsMainPage>

      <div className='flex justify-center my-16'>
        <Link to='/doctors'>
          <button className='btn text-center items-center rounded-full bg-gray-300 px-12 py-3 hover:cursor-pointer hover:bg-primary hover:text-white hover:font-bold transition-all'>more</button>
        </Link>
      </div>

      <div className='flex justify-between items-center md:px-18 md:pt-8  bg-primary h-fit rounded-2xl md:rounded-4xl'>
        <div className='flex flex-col gap-6 slef-center'>
          <p className='text-xl font-bold text-white md:text-4xl whitespace-nowrap'>Book Appointment</p>
          <p className='font-bold text-white text-2xl md:text-5xl whitespace-nowrap'>With 100+ Trusted Doctors</p>

          <button className='self-start px-8 py-2 bg-white rounded-full hover:scale-105 transition-transform duration-200 ease-in-out'>Create acccount</button>
        </div>

        <img className='hidden md:block object-contain w-96 -mt-32 ' src={assets.appointment_img} alt="" />
      </div>
      
    </div>
  )
}

export default Home
