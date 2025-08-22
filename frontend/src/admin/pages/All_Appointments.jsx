import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { MyGlobalContext } from '../../context/GlobalContext'
import AppointmentsTable from '../components/AppointmentsTable'
import { assets } from '../../assets/assets_admin/assets'

function All_Appointments() {
  const { fetchAllAppointments, appointmentData } = useContext(MyGlobalContext)
  console.log(appointmentData)
  const [filterisOpen, setFilterIsOpen] = useState(false)
  const [departmentIsOpen, setDepartmentIsOpen] = useState(false)
  const [genderIsOpen, setGenderIsOpen] = useState(false)
  const [statusIsOpen, setStatusIsOpen] = useState(false)
  const [feeIsOpen, setFeeIsOpen] = useState(false)
  const [paymentStatusIsOpen, setPaymentStatusIsOpen] = useState(false)
  const [completionStatusIsOpen, setCompletionStatusIsOpen] = useState(false)

  useEffect(() => {
    fetchAllAppointments()
  }, [])

  function handleFilterChange(event){
    
    alert(event.target.name)
  }


  return (
    <div>
      <div className={`${filterisOpen ? 'ml-70' : 'ml-48'} pt-24 py-7 pl-6 min-h-screen bg-gray-50  `}>
        <div className='flex gap-2 items-center justify-between mb-6 px-8 md:flex-row '>

          {/* Filter Buttons */}
          <div onClick={() => setFilterIsOpen(prev => !prev)} className={` ${filterisOpen ? 'bg-primary text-white font-bold' : ''} border px-10 py-1.5 flex gap-2 items-center justify-center hover:border-primary`}>
              <p >Filter</p> 
              <img className='w-4' src={assets.filter_icon} />
          </div>

          <select name="" id="" className='border px-10 py-2 hover:border-primary active:border-primary'>
            <option value="">Sort</option>
            <option value="">Newest</option>
            <option value="">Oldest</option>
          </select>

          {/* Filterting options */}
          <div className={`left-0 top-[75px] w-70 h-screen bg-white shadow-md z-10 px-4 pt-5 ${filterisOpen ? 'fixed' : 'hidden'} `}>
            <p className='underline mb-8'>Filtering Options</p>

            <div>
              {/* Department */}
              <div className='border px-4 py-2 '>
                <div className='flex justify-between items-center hover:border-primary'>
                  <span>Department</span>
                  <img onClick={() => setDepartmentIsOpen(prev => !prev)} className='w-8' src={departmentIsOpen ? assets.dropUp_icon : assets.dropDown_icon} alt="" />
                </div>
                
                {
                  departmentIsOpen && (
                    <div className='px-4'>
                      {/* Add department filtering options here */ 
                        appointmentData.map((info,idx)=> (
                          <div key={idx} className='flex gap-2'>
                            <input 
                              type="checkbox"  
                              id={info.doctorData.speciality}
                              name='department'
                              value={info.doctorData.speciality}
                              onChange={handleFilterChange}
                              />
                            <label htmlFor={info.doctorData.speciality}>{info.doctorData.speciality}</label>
                          </div>
                          
                        ))
                      }
                    </div>
                  )
                }
                
                
              </div>

              

              {/* Gender */}
              <div className='border px-4 py-2 '>
                <div className='flex justify-between items-center hover:border-primary'>
                  <span>Gender</span>
                  <img onClick={() => setGenderIsOpen(prev => !prev)} className='w-8' src={genderIsOpen ? assets.dropUp_icon : assets.dropDown_icon} alt="" />
                </div>
                
                {
                  genderIsOpen && (
                    <div className='px-4'>
                      {/* Add department filtering options here */ 
                        ["Would rather not say", "Male", "Female"].map((info,idx)=> (
                          <div key={idx} className='flex gap-2'>
                            <input 
                              type="checkbox" 
                              name='gender'
                              value={info} 
                              id={info} 
                              onChange={handleFilterChange}
                            />
                            <label htmlFor={info}>{info}</label>
                          </div>
                          
                        ))
                      }
                    </div>
                  )
                }
                
                
              </div>

              {/* Status */}
              <div className='border px-4 py-2 '>
                <div className='flex justify-between items-center hover:border-primary'>
                  <span>Status</span>
                  <img onClick={() => setStatusIsOpen(prev => !prev)} className='w-8' src={statusIsOpen ? assets.dropUp_icon : assets.dropDown_icon} alt="" />
                </div>
                
                {
                  statusIsOpen && (
                    <div className='px-4'>
                      {/* Add department filtering options here */ 
                        ["Pending", "Cancelled"].map((info,idx)=> (
                          <div key={idx} className='flex gap-2'>
                            <input 
                              type="checkbox" 
                              name='status'
                              value={info}
                              id={idx} 
                              onChange={handleFilterChange}
                            />
                            <label htmlFor={idx}>{info}</label>
                          </div>
                          
                        ))
                      }
                    </div>
                  )
                }
                
                
              </div>

              {/* Fee */}
             <div className='border px-4 py-2 '>
                <div className='flex justify-between items-center hover:border-primary'>
                  <span>Fee</span>
                  <img onClick={() => setFeeIsOpen(prev => !prev)} className='w-8' src={feeIsOpen ? assets.dropUp_icon : assets.dropDown_icon}  alt="" />
                </div>
                
                {
                  feeIsOpen && (
                    <div className='flex flex-col mb-3'>
                        <div className='px-4 flex gap-4'>
                          <input 
                            type="text" 
                            placeholder='min'
                            className='w-16 border pl-2' />
                            <span className='bold'>-</span>
                            <input 
                              type="text" placeholder='max'
                              className='w-16 pl-2 border'
                              />
                          </div>

                          <div className='flex justify-center mt-4'>
                            <button className='bg-primary px-8 py rounded-full text-white font-bold hover:bg-btnHover hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer'>Search </button>
                          </div>
                        
                          {/* <input 
                            type="range" 
                            name="" 
                            id=""
                            className='mt-4'
                            min={0}
                            max={100}
                          /> */}


                    </div>
                    
                  )
                }
                
                
              </div>

            

              {/* Payment Status */}
               <div className='border px-4 py-2 '>
                <div className='flex justify-between items-center hover:border-primary'>
                  <span>Payment Status</span>
                  <img onClick={() => setPaymentStatusIsOpen(prev => !prev)} className='w-8' src={paymentStatusIsOpen ? assets.dropUp_icon : assets.dropDown_icon} alt="" />
                </div>
                
                {
                  paymentStatusIsOpen && (
                    <div className='px-4'>
                      {/* Add department filtering options here */ 
                        ["Pending", "Cancelled"].map((info,idx)=> (
                          <div key={idx} className='flex gap-2'>
                            <input 
                              type="checkbox" 
                              name='paymentStatus'
                              value={info}
                              id={idx + `payment status`}
                              onChange={handleFilterChange}

                              />
                            <label htmlFor={idx+ `payment status`}>{info}</label>
                          </div>
                          
                        ))
                      }
                    </div>
                  )
                }
                
                
              </div>

              {/* Completion Status */}
              <div className='border px-4 py-2 '>
                <div className='flex justify-between items-center hover:border-primary'>
                  <span>Completion Status</span>
                  <img onClick={() => setCompletionStatusIsOpen(prev => !prev)} className='w-8' src={completionStatusIsOpen ? assets.dropUp_icon : assets.dropDown_icon} alt="" />
                </div>
                
                {
                  completionStatusIsOpen && (
                    <div className='px-4'>
                      {/* Add department filtering options here */ 
                        ["Pending", "Cancelled"].map((info,idx)=> (
                          <div key={idx} className='flex gap-2'>
                            <input 
                              type="checkbox" 
                              name='completionStatus' 
                              value={info}
                              id={idx + `completion status`} 
                              onChange={handleFilterChange}
                            />
                            <label htmlFor={idx+ `completion status`}>{info}</label>
                          </div>
                          
                        ))
                      }
                    </div>
                  )
                }          
              </div>

              
              

            </div>
          </div>
          
          
        </div>
        <hr className='mb-4' />
        <AppointmentsTable 
          appointments={appointmentData}
          title="All Appointments"
          caption="History of all appointments made by patients."
          showActions={true}
      />
      </div>
    </div>
    
  )
}

export default All_Appointments