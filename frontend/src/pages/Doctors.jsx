import React, { useEffect, useState } from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { MyGlobalContext } from '../context/GlobalContext'

const Doctors = () => {

  const {doctors} = useContext(MyGlobalContext)

  const {speciality} = useParams()

  const  [filteredDoctors, setDoctors] = useState([])

  const handleFilter = (speciality) => {
    let filteredDoctors = doctors.filter((doctor) => {
      if(doctor.speciality == speciality) return doctor
    })
    setDoctors(filteredDoctors)
  }

  useEffect(() => {
  if (speciality) {
    handleFilter(speciality)
  } else {
    setDoctors(doctors)
  }
}, [speciality]) 


  return (
    <div>
      <p className='font-semibold pt-4'>Browse through the doctors specialists
      </p>

      <div className='md:flex gap-12'>
        <div>
          < MobileScreenFilter/>
          <MediumScreenFilter />
        </div>

        <div className='flex gap-4 mt-8 w-[90%] '>
          {/* Grid */}
          <div className='w-full place-items-center  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
            {filteredDoctors.map((doctor, index) => {
              // card
              return(
                <DoctorCard key={index}  value={doctor}></DoctorCard>
              )
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Doctors

const MediumScreenFilter = () => {
  return (
    <div className='hidden md:block mt-6 ' >
      <div className='specialDoctorNav flex flex-col gap-4 '>
        {specialityData.map((speciality, index) => {
          return (
            <NavLink key={index} to={`/doctors/${speciality.speciality}`} className='a'>
              <div className='pr-16 pl-3 py-1 ring-1 rounded-sm'>
                <p>{speciality.speciality}</p>
              </div>
            </NavLink>
          )
          
        })}
        <NavLink to='/doctors' >
          <div className='pr-8 pl-3 py-1 ring-1 rounded-sm font-bold ring-primary'>Show All Doctors</div>
        </NavLink>
      </div>

    </div>
  )
}

const MobileScreenFilter = () => {

  const [filterOn, setFilter] = useState(false)

  return (
    <div className='block md:hidden mt-6'>
      <div>
        <button className={`py-1 px-3 ring-1 rounded-sm ${filterOn ? "bg-primary text-white font-bold" : null}`} onClick={() => setFilter(!filterOn)}>Filter</button>
      </div>

      <div className={`specialDoctorNav flex-col gap-4 ${filterOn ? "flex" : "hidden"} mt-6`}>
        {specialityData.map((speciality, index) => {
          return (
            <NavLink key={index} to={`/doctors/${speciality.speciality}`} className='a'>
              <div className='pl-2 pr-16 py-3 ring-1 rounded-sm'>
                <label htmlFor={``} >{speciality.speciality}</label>
              </div>
            </NavLink>
          )
        })}
        <NavLink to='/doctors' >
          <div className='pl-2 pr-16 py-3 ring-1 rounded-sm  font-bold ring-primary'>Show All Doctors</div>
        </NavLink>
      </div>
      
    </div>
  )
}
