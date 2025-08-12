import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '../assets/assets_frontend/assets'
import { assets } from '../assets/assets_frontend/assets'
import DoctorCard from '../components/DoctorCard'
import { toast } from 'react-toastify'



const Appointment = () => {
  const {docId} = useParams()
  
  const [doctor,setDoctor] = useState()
  const [relatedSpecialities, setSpeciality] = useState(null)

  const [docSlots,setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('') 
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getAvailableSlotes = async () => {
    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++){
      const currentDate = new Date()
      currentDate.setDate(today.getDate() + i)
      
      // Setting end time
      const endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(22,0,0,0)

      // Setting starting time
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)

        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0 )
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }


      // Creating time slots
      const timeSlots = []

      while(currentDate < endTime){
        const formattedTime = currentDate.toLocaleTimeString([], {hour : '2-digit', minute: '2-digit'})

        timeSlots.push({
          datetime : new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const BookAppontment = () => {
    console.log('Book')
    const date = docSlots[slotIndex][0].datetime.getDate()
    const month = docSlots[slotIndex][0].datetime.getMonth() + 1
    const year = docSlots[slotIndex][0].datetime.getFullYear()
    const time = docSlots[slotIndex][slotTime].time
    
    console.log(date + '-' + month + '-' + year, time)

    toast.success("Wow so easy!")

  }


  useEffect(() => {
    getAvailableSlotes()
    console.log('docSlots:',docSlots)
  }, [docId, doctor])


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
            <div className='flex gap-5'>
              {
               
              docSlots.map((day, index) =>{

                console.log(day, 'iteration:', index)

                if(day.length === 0) return null;

                return (
                  <>
                    <div onClick={() => setSlotIndex(index)} className={`flex flex-col rounded-full box-border px-2 py-10 items-center mt-4 ${slotIndex === index ? 'bg-primary text-white' : 'bg-white ring ring-gray-200'}`}>
                      <p>{daysOfWeek[day[0].datetime.getDay()]}</p>
                      <p>{day[0].datetime.getDate()}</p>
                    </div>
                  </>
                  
                )
              })
            }
            </div>

            <div className={`flex gap-5 max-w-[90vw] px-2 py-4 md:max-w-[60vw] overflow-x-auto`}>
              {docSlots[slotIndex]?.map((slot,i) => (
                <p onClick={()=> setSlotTime(i)} className={`ring ring-gray-200 px-4 rounded-full cursor-pointer ${slotTime === i ? 'bg-primary text-white' : 'bg-white'}`}>{slot.time}</p>
              ))}
            </div>
            
          </div>            

            <button onClick={BookAppontment} className='mt-4 px-16 py-3 bg-primary cursor-pointer text-white rounded-2xl font-medium '>Book and appointment </button>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <div className='mt-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-medium'>Related Soctors</h2>
          <p className='text-gray-600'> simply browse through our extensive list of trusted doctors.</p>
        </div>
        

        <div className='flex flex-wrap justify-center gap-6 pt-5 t-5 gap-y-6  mt-8'>
          {doctors.filter(doctor => { 
            if(doctor.speciality === relatedSpecialities && doctor._id !== docId){
              
              return doctor
            }
            }).map((doctor, index) => {
            
              return (
                <div className='size-1/2 lg:size-1/4'>
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
