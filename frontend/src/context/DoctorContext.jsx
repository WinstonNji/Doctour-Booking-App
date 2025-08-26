import React, { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import { MyGlobalContext } from './GlobalContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets_admin/assets'

export const MyDoctorContext = createContext()


function DoctorContext({children}) {

    const {doctorUrl, token} = useContext(MyGlobalContext)
    const [appointments, setAppointments] = useState([])
    const [userData, setUserData] = useState({
        name: "Default",
        image: assets.upload_area,
        email: "",
        speciality: "",
        experience: "",
        about: "",
        address: { 
            line1: "",
            line2: "" 
        },
        _id: ""
    })


    async function fetchDoctorAppointments(){
        try {
        const endPoint = doctorUrl + '/doctor-appointments'
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const response = await axios.get(endPoint, {headers})

        if(!response.data.success){
            return toast.error(response.data.message)
        }

        setAppointments(response.data.data)

        } catch (error) {
        }
        
    }

    async function getDoctorProfile(){
        const endPoint = doctorUrl + '/doctor-profile'
        const headers = {
            Authorization : `Bearer ${token}`
        }
        const response = await axios.get(endPoint, {headers})
        
        if(!response.data.success){
            toast.error(response.data.message)
        }

        const raw = response.data.doctorProfileData
        let normalizedAddress = { line1: '', line2: '' }
        try {
            normalizedAddress = typeof raw.address === 'string' 
                ? JSON.parse(raw.address || '{}') 
                : (raw.address || { line1: '', line2: '' })
        } catch {
            normalizedAddress = { line1: '', line2: '' }
        }

        setUserData({ ...raw, address: normalizedAddress })
    }

    async function updateDoctorProfile({address, about}){
        try {
            const endPoint = doctorUrl + '/update-doctor-profile'
            const headers = {
                Authorization : `Bearer ${token}`
            }

            const payload = {
                address: typeof address === 'string' ? address : JSON.stringify(address || {line1: '', line2: ''}),
                about: about || ''
            }

            const response = await axios.patch(endPoint, payload, {headers})

            if(!response.data.success){
                return toast.error(response.data.message)
            }

            toast.success(response.data.message)
            setUserData(prev => ({...prev, address: payload.address, about: payload.about}))
        } catch (error) {
            console.log(error)
            toast.error('Failed to update profile')
        }
    }
    
    

    const values = {
        fetchDoctorAppointments,
        appointments,
        userData,
        setUserData,
        getDoctorProfile,
        updateDoctorProfile
    }
  return (
    <MyDoctorContext.Provider value={values}>
        {children}
    </MyDoctorContext.Provider>
  )
}

export default DoctorContext
