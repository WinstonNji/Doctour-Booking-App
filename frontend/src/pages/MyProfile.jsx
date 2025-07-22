import React from 'react'


import { assets } from '../assets/assets_admin/assets'
import { useState } from 'react'


const MyProfile = () => {

  const [isEditOn, setEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: "Winnie",
    image: assets.upload_area,
    email: 'winston55@gmail.com',
    phone: "+250 123 456 789",
    address: {
      line1: "57th Cross, RichMond",
      line2: "Circle, Church Road, London" 
    },
    gender: "Male",
    dob: '2000-01-20'
  })


  return (
    <div className='md:w-1/2 h-[65vh]'>
      <div className='mt-8'>
        <img className=' bg-primary p-4 rounded-2xl' src={userData.image} alt="" />
        {isEditOn ? 
          (
            <input type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} />
          ) : (
            <h1 className='font-bold text-2xl mt-4'>{userData.name}</h1>
          )}
        
      </div>
      <hr className='mt-4' />

      <div className='mt-7'> 
        <p className='underline uppercase'>Contact Information</p>

        <div className='mt-2'>
          <div className='flex justify-between'>
            <p className='font-semibold'>Email id:</p>
            <p className='text-blue-400 font-medium'>{userData.email}</p>
          </div>

          <div className='flex justify-between'>
            <p className='font-semibold'>Phone</p>
            {isEditOn ? 
              (
                <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev, phone:e.target.value}))} />
              ) : (
                <p className='font-medium text-blue-400'>{userData.phone}</p>
              )
            }
            
          </div>
        </div>
        
        <div className='flex justify-between'>
            <p className='font-semibold'>Address:</p>
            <div className='flex flex-col text-end text-gray-500 '>
              {
                isEditOn ? (
                  <>
                      <input 
                        type="text" 
                        value={userData.address.line1}
                        onChange={(e) => setUserData((prev) => ({...prev, address : {...prev.address, line1: e.target.value} }) )}
                      />
                      <input 
                        type="text" 
                        value={userData.address.line2} 
                        onChange={(e) => setUserData((prev) => ({...prev, address : {...prev.address, line2: e.target.value} }) )}
                      />
                  </>
                  
                ) : (
                  <>
                    <p className='text-end'>{userData.address.line1}</p>
                    <p>{userData.address.line2}</p>
                  </> 
                  
                )
              }
              
            </div>
        </div>
        

        <div className='mt-6'>
          <p className='underline uppercase'>Basic Information</p>

          <div className='flex flex-col gap-2'>
            <div className='flex mt-2'>
              <p className='font-semibold'>Gender:</p>
              {isEditOn ? 
                (
                  <select onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender} name="" id="">
                    <option value="null">Would rather not say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className='px-3'>{userData.gender}</p>
                )
              }
              
              
            </div>
            <div className='flex '>
              <p className='font-semibold'>Birthday: </p>
              {isEditOn ? 
                (
                  <input type="date" value={userData.dob} onChange={e => setUserData(prev => ({...prev, dob:e.target.value}))} />
                ) : (
                  <p className='font-medium text-blue-400 px-3'>{userData.dob}</p>
                )
            }
            </div>
          </div>
        </div>
        

        
        <button onClick={() => setEdit(prev => !prev)} className='mt-14 px-8 rounded-full ring-primary ring py-1'>
          {isEditOn ? 'Save' : "Edit"}
        </button>

      </div>
    </div>
  )
}

export default MyProfile
