import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import DoctorCard from '../components/DoctorCard'
import { toast } from 'react-toastify'
import { MyGlobalContext } from '../context/GlobalContext'
import { useContext } from 'react'
import axios from 'axios'

const Appointment = () => {
  const {docId} = useParams()
  const {doctors, userIsLoggedIn, clientUrl, token, fetchAllDoctors} = useContext(MyGlobalContext)
  const navigate = useNavigate()
  
  const [doctor,setDoctor] = useState()
  const [relatedSpecialities, setSpeciality] = useState(null)
  const [selectedDate, setSelectedDate] = useState('') // Changed from null to empty string
  const [selectedTime, setSelectedTime] = useState('') // Changed from null to empty string
  
  const maxDateObj = new Date()
  maxDateObj.setDate(maxDateObj.getDate() + 30) 
  const maxDate = maxDateObj.toISOString().split("T")[0]
  
  const alltimeSlots = [
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
    "21:00", "21:30",
    "22:00"
  ]

  // Function to get available time slots for the selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return []

    const now = new Date()
    const today = new Date().toISOString().split('T')[0]
    const isToday = selectedDate === today

    return alltimeSlots.filter((time) => {
      // Check if slot is already booked
      const isBooked = doctor?.slots_booked?.[selectedDate]?.includes(time)
      if (isBooked) return false

      // If selected date is today, filter out past time slots
      if (isToday) {
        const [hours, minutes] = time.split(':').map(Number)
        const slotDateTime = new Date()
        slotDateTime.setHours(hours, minutes, 0, 0)
        
        if (slotDateTime <= now) return false
      }

      return true
    })
  }

  const [booking, setBooking] = useState(false)

  const BookAppointment = async () => {
    if(!userIsLoggedIn){
      toast.error('Login is required for this feature')
      return navigate('/login') 
    }
    
    if (!selectedTime) {
      toast.error('Please select a time slot')
      return
    }

    const data = {
      slotDate: selectedDate,
      slotTime: selectedTime,
      docId
    }

    try {
      if(booking) return
      setBooking(true)
      const endpoint = clientUrl + '/book-appointment'
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axios.post(endpoint, data, {headers})

      if(!response.data.success){
        return toast.error(response.data.message)
      }

      toast.success(response.data.message)
      navigate('/my-appointments')
      
      // Update doctor's booked slots locally for immediate UI update
      setDoctor(prev => {
        if (!prev) return prev
        const updated = { ...prev }
        if (!updated.slots_booked) updated.slots_booked = {}
        if (!updated.slots_booked[selectedDate]) updated.slots_booked[selectedDate] = []
        updated.slots_booked[selectedDate] = [...updated.slots_booked[selectedDate], selectedTime]
        return updated
      })
      
      setSelectedTime('') 
      
    } catch (error) {
      console.error(error)
      toast.error('An error Occured')
    } finally {
      setBooking(false)
    }
  }

  

  useEffect(() => {
    setDoctor(doctors.find((doctor) => {
      if(doctor._id === docId ){
        setSpeciality(doctor.speciality)
        return doctor
      }
    }))
  }, [docId, doctors])

  // Reset selected time when date changes
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    setSelectedTime('') // Clear time selection when date changes
  }

  return (
    <div className='mt-6'>
      <div className='flex flex-col items-start gap-5 text-black md:flex-row '>
        <div className='flex justify-center w-full lg:w-auto'> 
          <img className='bg-primary rounded-2xl object-cover sm:max-w-72 ' src={doctor?.image} alt="" />
        </div>

        <div>
          {/* Doctor Details */}
          <div className='bg-white p-6 rounded-3xl border border-gray-400 py-7'>
            <div className='xl:w-[95%] 2xl:w-[75%] gap-3 flex flex-col'>
              <div className='flex gap-4'>
                <h1 className='font-bold text-3xl'>{doctor?.name}</h1>
                <img src={assets.verified_icon} alt="" />
              </div>
              
              <div className='flex gap-3 items-center text-gray-600'>
                <p>{`${doctor?.degree} - ${doctor?.speciality}`}</p>
                <p className='px-2 ring-1 rounded-full whitespace-nowrap'>{doctor?.experience > 1 ? `${doctor?.experience}years` : `${doctor?.experience}year` }</p>
              </div>
              
              <div className='flex gap-2 font-semibold'>
                <p>About</p>
                <img src={assets.info_icon} alt="" />
              </div>
              
              <p className='text-gray-600'>{doctor?.about}</p>
              <p className='font-semibold'>Appointment: ${doctor?.fee}</p>
            </div>
          </div>
        
          {/* Booking Slots */}
          <div className='mt-7'>
            <p className='font-medium text-gray-600'>Booking slots</p> 

            <div className='flex flex-col gap-3 mt-4'>
              <input 
                className='ring py-3 px-2 rounded-2xl focus:outline-none focus:ring-primary'
                type="date" 
                min={new Date().toISOString().split("T")[0]}
                max={maxDate}
                onChange={handleDateChange}
                value={selectedDate} 
              />

              <select 
                className={`ring py-3 px-2 rounded-2xl focus:outline-none focus:ring-primary ${!selectedDate ? 'border-gray-400 border text-gray-400' : ''}`}
                disabled={!selectedDate}
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}  
              >
                <option value="">{selectedDate ? 'Select a time slot' : 'Select a date first'}</option>   
                {getAvailableTimeSlots().map((time, index) => (
                  <option key={index} value={time}>{time}</option> 
                ))}
              </select> 
            </div>

            <button 
              disabled={!selectedDate || !selectedTime || booking} 
              onClick={BookAppointment} 
              className={`mt-4 px-16 py-3 cursor-pointer text-white rounded-2xl font-medium ${(!selectedDate || !selectedTime || booking) ? 'bg-gray-400' : 'bg-primary'} disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {booking ? 'Booking…' : 'Book an appointment'}
            </button> 
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <div className='mt-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-medium'>Related Doctors</h2>
          <p className='text-gray-600'>Simply browse through our extensive list of trusted doctors.</p>
        </div>
        
        <div className='flex flex-wrap justify-center gap-6 pt-5 t-5 gap-y-6 mt-8'>
          {doctors.filter(doctor => { 
            if(doctor.speciality === relatedSpecialities && doctor._id !== docId){
              return doctor
            }
          }).map((doctor, index) => (
            <div className='size-1/2 lg:size-1/4' key={index}>
              <DoctorCard value={doctor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Appointment