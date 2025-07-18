import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='grid grid-cols-1 place-content-center md:flex mt-24 mb-4 gap-7'>
        <div className='flex-2 '>
            <img className='mb-5' src={assets.logo} alt="" />
            <p className='pt-4 md:w-3/4'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat expedita esse voluptas quia officia, corporis accusantium delectus, nulla magni quaerat amet laudantium non cupiditate dolorum.
            </p>
        </div>

        <div className='flex-1'>
            <p className='font-medium text-xl mb-5'>Company</p>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <h1 className='font-medium text-xl whitespace-nowrap mb-5'>GET IN TOUCH</h1>
            <p>+0-000-000-00</p>
            <p>papiwinnie@gmail.com</p>

        </div>
    </div>
  )
}

export default Footer
