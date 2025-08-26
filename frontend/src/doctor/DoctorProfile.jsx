import React, { useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import { MyDoctorContext } from '../context/DoctorContext'

function DoctorProfile() {
  const {userData, setUserData, getDoctorProfile, updateDoctorProfile} = useContext(MyDoctorContext)
  const [isEditOn, setEdit] = useState(false)
  const [imageUrl, setImageUrl] = useState(false)
  const [originalData, setOriginalData] = useState(null)
  
  useEffect(() => {
    getDoctorProfile()
  }, [])

  const handleEdit = () => {
    if (!isEditOn) {
      // Store original data before editing
      setOriginalData({...userData})
    }
    setEdit(true)
  }

  const handleCancel = () => {
    // Restore original data
    if (originalData) {
      setUserData(originalData)
    }
    setImageUrl(false)
    setEdit(false)
  }

  const handleSave = async () => {
    const addressObject = (() => {
      try {
        return typeof userData?.address === 'string' ? JSON.parse(userData.address) : userData?.address || {line1:'', line2:''}
      } catch {
        return {line1:'', line2:''}
      }
    })()

    await updateDoctorProfile({
      address: addressObject,
      about: userData?.about || ''
    })
    setEdit(false)
    setOriginalData(null)
  }
  
  return (
    <div className='ml-48 pt-24 pl-6 min-h-screen  bg-gray-50'>
      <div className='md:w-1/2'>
        <div className='-mt-10'>
        <img className='p-4 rounded-full w-60' src={imageUrl ? URL.createObjectURL(imageUrl) : userData?.image} alt="" />

        
        <h1 className='font-bold text-2xl mt-4'>{userData?.name}</h1>
        
      </div>
      <hr className='mt-4' />
        <div className='mt-7'> 
          <p className='underline uppercase'>Contact Information</p>
          <div className='mt-2'>
            <div className='flex flex-col md:flex-row md:justify-between'>
              <p className='font-semibold'>Email id:</p>
              <p className='text-blue-400 font-medium'>{userData?.email}</p>
            </div>
          </div>
        
          <div className='flex flex-col md:flex-row md:justify-between'>
              <p className='font-semibold'>Address:</p>
              <div className='flex flex-col text-start md:text-end text-gray-500 '>
                {
                  isEditOn ? (
                    <>
                        <input 
                          type="text" 
                          value={(() => {
                            try {
                              const address = typeof userData?.address === 'string' 
                                ? JSON.parse(userData.address) 
                                : userData?.address || {};
                              return address.line1 || '';
                            } catch {
                              return '';
                            }
                          })()}
                          onChange={(e) => setUserData((prev) => {
                            try {
                              const currentAddress = typeof prev.address === 'string' 
                                ? JSON.parse(prev.address) 
                                : prev.address || {};
                              return {
                                ...prev, 
                                address: typeof prev.address === 'string' 
                                  ? JSON.stringify({...currentAddress, line1: e.target.value})
                                  : {...currentAddress, line1: e.target.value}
                              };
                            } catch {
                              return {...prev, address: {line1: e.target.value, line2: ''}};
                            }
                          })}
                          className='ring mt-2 px-2 py-1'
                          placeholder="Address Line 1"
                        />
                        <input 
                          type="text" 
                          value={(() => {
                            try {
                              const address = typeof userData?.address === 'string' 
                                ? JSON.parse(userData.address) 
                                : userData?.address || {};
                              return address.line2 || '';
                            } catch {
                              return '';
                            }
                          })()}
                          onChange={(e) => setUserData((prev) => {
                            try {
                              const currentAddress = typeof prev.address === 'string' 
                                ? JSON.parse(prev.address) 
                                : prev.address || {};
                              return {
                                ...prev, 
                                address: typeof prev.address === 'string' 
                                  ? JSON.stringify({...currentAddress, line2: e.target.value})
                                  : {...currentAddress, line2: e.target.value}
                              };
                            } catch {
                              return {...prev, address: {line1: '', line2: e.target.value}};
                            }
                          })}
                          className='ring mt-2 px-2 py-1'
                          placeholder="Address Line 2"
                        />
                    </>
                  
                  ) : (
                    <>
                      <p className='text-start md:text-end'>{(() => {
                        try {
                          const address = typeof userData?.address === 'string' 
                            ? JSON.parse(userData.address) 
                            : userData?.address || {};
                          return address.line1 || '';
                        } catch {
                          return '';
                        }
                      })()}</p>
                      <p>{(() => {
                        try {
                          const address = typeof userData?.address === 'string' 
                            ? JSON.parse(userData.address) 
                            : userData?.address || {};
                          return address.line2 || '';
                        } catch {
                          return '';
                        }
                      })()}</p>
                    </> 
                  
                  )
                }
              
              </div>
          </div>
        
          <div className='mt-6'>
            <p className='underline uppercase'>Professional Information</p>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col md:flex-row mt-2 md:justify-between'>
                <p className='font-semibold'>Speciality:</p>
                <p className='font-medium text-blue-400'>{userData?.speciality}</p>
              </div>
              
              <div className='flex flex-col md:flex-row md:justify-between'>
                <p className='font-semibold'>Experience: </p>
                <p className='font-medium text-blue-400'>{userData?.experience} years</p>
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <p className='underline uppercase'>About</p>
            <div className='mt-2'>
              {isEditOn ? 
                (
                  <textarea 
                    value={userData?.about || ''} 
                    onChange={e => setUserData(prev => ({...prev, about:e.target.value}))} 
                    className='ring px-2 py-2 w-full h-24 resize-none'
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className='text-gray-600 text-sm'>{userData?.about}</p>
                )
              }
            </div>
          </div>
        
          <div className='mt-6 flex flex-col sm:flex-row gap-3'>
            {!isEditOn ? (
              <button onClick={handleEdit} className='px-8 rounded-full ring-primary ring py-1'>
                Edit
              </button>
            ) : (
              <>
                <button onClick={handleSave} className='px-8 rounded-full ring-primary ring py-1'>
                  Save
                </button>
                <button onClick={handleCancel} className='px-8 rounded-full ring-gray-400 ring py-1 text-gray-600'>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
export default DoctorProfile