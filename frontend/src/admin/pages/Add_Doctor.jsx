import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'

function Add_Doctor() {
  return (
    <div className='ml-48 pt-24 pl-6 h-screen bg-gray-50'>
      <p className='font-bold'>Add Doctor</p>

      <form action="" className='bg-white px-8 py-4 lg:w-[60%] mt-4'>
        <div className='flex gap-2 items-center pb-6'>
          <img className='w-14' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232' alt="" />

          <label className='ring hover:px-8 hover:py-2 px-4 ring-gray-400 rounded-md hover:bg-primary transition-all ease-in-out duration-200 hover:text-white hover:ring-0 hover:cursor-pointer' htmlFor="uploadImg">Upload Doctor Image</label>

          <input type="file" id='uploadImg' name="image" className='hidden' required/>
        </div>

        <div className='flex pb-4 gap-8 items-center'> 
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Doctor name</label>
            <input className='ring ring-gray-300  px-2 py-1' type="text" placeholder='Name' required />
          </div>

          <div className='flex flex-col w-1/2 gap-2'>
            <label htmlFor="">Speciality</label>
            <input className='ring ring-gray-300 px-2 py-1' type="text" placeholder='General physician' required />
          </div>
        </div>

        <div className='flex pb-4 gap-8'>
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Doctor Email</label>
            <input className='ring ring-gray-300 px-2 py-1' type="text" placeholder='Your email' required />
          </div>

          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Education</label>
            <input className='ring ring-gray-300 px-2 py-1' type="text" placeholder='Education' required/>
          </div>
        </div>

        <div className='flex pb-4 gap-8'>
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Doctor Password</label>
            <input className='ring ring-gray-300 px-2 py-1' type="text" placeholder='Password' required />
          </div>

          <div className='flex flex-col w-1/2 gap-2'>
            <label htmlFor="">Address</label>
            <input type="text" placeholder='Address 1' className='ring ring-gray-300 px-2 py-1'/>
            <input type="text" placeholder='Address 2' className='ring ring-gray-300 px-2 py-1' required />
          </div>
        </div>

        
        <div className='flex flex-col gap-1.5 -mt-14'>
          <label htmlFor="">Experience</label>
          <select className='text-gray-500 ring ring-gray-400 w-1/2 px-2 py-1' required>
            <option value="experience">Experience</option>
          </select>
        </div>

        <div className='flex flex-col mt-4 gap-2'>
          <label htmlFor="">Fees</label>
          <input className='ring ring-gray-300 w-1/2 px-2 py-1' placeholder='Your fees' type="text" required />
        </div>

        <div className='flex flex-col mt-4 gap-2'>
          <label htmlFor="">About me</label>
          <textarea className='ring px-2 py-1' name="" id="" required></textarea>
        </div>

        <button className='px-8 bg-primary py-2 rounded-full mt-4 text-white font-bold hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer' type="submit">Add doctor</button>
      </form>
    </div>
  )
}

export default Add_Doctor
