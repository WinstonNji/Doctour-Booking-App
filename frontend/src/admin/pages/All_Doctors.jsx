import React, { useEffect, useState } from 'react'
import { doctors as docArray } from '../../assets/assets_frontend/assets'
import DoctorCard from '../../components/DoctorCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MyGlobalContext } from '../../context/GlobalContext'
import { useContext } from 'react'


function All_Doctors() {
    const {generalUrl, token} = useContext(MyGlobalContext)
    
    const [doctors, setDoctors] = useState([])

    const fetchAllDoctors = async () => {
        try {
            // endpoint
            const endpoint = generalUrl + '/getAllDoctors'

            // headers
            const headers = {
                Authorization : `Bearer ${token}`
            }

            const response = await axios.get(endpoint, {headers})

            setDoctors(response.data.doctors)
        } catch (error) {
                
        }
    }

    useEffect(() => {
        fetchAllDoctors()
    }, [])
  return (
    <div className=' ml-48 pt-24 pl-6 pr-6 h-screen bg-gray-50 pb-20'>
        <div className='flex flex-wrap justify-center gap-2 gap-y-6 pb-20'>
            {doctors.map((doctor,index) => (
                <div className=''>
                    <DoctorCard key={index} value={doctor} />
                </div>
                
            ))}
        </div>
    </div>
  )
}

export default All_Doctors
