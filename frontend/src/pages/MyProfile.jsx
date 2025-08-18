import React, { useEffect } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useState } from 'react'
import axios from 'axios'
import { MyGlobalContext } from '../context/GlobalContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
 

const MyProfile = () => {

  const {clientUrl, token, setPfp, userData, setUserData} = useContext(MyGlobalContext)


  const [isEditOn, setEdit] = useState(false)
  const [imageUrl, setImageUrl] = useState(false)


   async function editProfile(){

    if(isEditOn){

      const endpoint = clientUrl + `/update-user`
      const headers = { 
        Authorization : `Bearer ${token}`
      }

      const address = {
        line1 : userData.address.line1,
        line2 : userData.address.line2
      }

      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('email', userData.email )
      formData.append('address', address)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      formData.append('phone', userData.phone)
      formData.append('image', imageUrl)

      console.log(imageUrl, '----imageUrl')

      
      

      try {
        const response =  await axios.patch(endpoint, formData, {headers})
        
        if(response.data.success){
          const previewUrl = imageUrl ? URL.createObjectURL(imageUrl) : userData.image
          console.log(previewUrl)
          setPfp(previewUrl)
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }

      } catch (error) {
      
      }
    }
    
  }


  return (
    <div className='md:w-1/2 h-full'>
      <div className='mt-8'>
        <img className='p-4 rounded-2xl w-60' src={imageUrl ? URL.createObjectURL(imageUrl) : userData.image} alt="" />

        {isEditOn && (
          <div>
            <label className='bg-primary px-4 rounded-full py-2 font-semibold text-white cursor-pointer hover:bg-btnHover' htmlFor="img">Change Profile Picture</label>
            <input className='hidden' type="file" name="image" id="img" onChange={(e) => setImageUrl(e.target.files[0])} />
          </div>
          
        )}
        
        {isEditOn ? 
          (
            <input type="text" className='mt-4 ring px-2' value={userData.name} onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} />
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
                <input  type="text" className='ring px-2' value={userData.phone} onChange={e => setUserData(prev => ({...prev, phone:e.target.value}))} />
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
                        className='ring mt-2'
                      />
                      <input 
                        type="text" 
                        value={userData.address.line2} 
                        onChange={(e) => setUserData((prev) => ({...prev, address : {...prev.address, line2: e.target.value} }) )}
                      className='ring mt-2'
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
                  <select 
                    onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender} 
                    name="" 
                    id=""
                    className='ring ml-2 py-2'
                    >
                    <option value="Would rather not say">Would rather not say</option>
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
                  <input 
                    type="date" 
                    value={userData.dob} 
                    onChange={e => setUserData(prev => ({...prev, dob:e.target.value}))} 
                    className='ring px-2 ml-2 py-2'/>
                  
                ) : (
                  <p className='font-medium text-blue-400 px-3'>{userData.dob}</p>
                )
            }
            </div>
          </div>
        </div>
        

        
        <button onClick={() => {
          setEdit(prev => !prev)
          editProfile()
        }} className='mt-6 px-8 rounded-full ring-primary ring py-1'>
          {isEditOn ? 'Save' : "Edit"}
        </button>

      </div>
    </div>
  )
}

export default MyProfile
