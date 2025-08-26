import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets_frontend/assets'

export const MyGlobalContext = createContext()

function GlobalContext({children}) {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' )
    const [doctors, setDoctors] = useState([])
    const [userIsLoggedIn, setUserLoginStatus] = useState(false)
    const [pfp, setPfp] = useState(null)
    const [userData, setUserData] = useState({
    name: "",
    image: assets.upload_area,
    email: "",
    phone: "",
    address: { 
        line1: "",
        line2: "" 
    },
    gender: "Not yet specified",
    dob: ""
    })
    const [appointmentData, setAppointmentData] = useState([])

    const fetchAllDoctors = async () => {
        try {
            // endpoint
            const endpoint = `${values.generalUrl}` + '/getAllDoctors'

            // headers
            const headers = {
                Authorization : `Bearer ${token}`
            }

            const response = await axios.get(endpoint, {headers})

            setDoctors(response.data.doctors)
            
        } catch (error) {
                    
        }
    } 

    const formatDate = (slotDate) => {
        const dateObj = new Date(slotDate)
        const day = dateObj.getDate()
        const month = dateObj.toLocaleString('en-US', { month: 'long' })
        const year = dateObj.getFullYear()
        return `${day} ${month} ${year}`
    } 

    const values = {
        // Urls
        adminBackendUrl : 'https://doctour-booking-app.onrender.com/api/admin',
        generalUrl : 'https://doctour-booking-app.onrender.com/api/doctourApp/general',
        clientUrl : 'https://doctour-booking-app.onrender.com/api/user',
        appointmentUrl : 'https://doctour-booking-app.onrender.com/api/appointment',
        paymentUrl : 'https://doctour-booking-app.onrender.com/api/payments',
        doctorUrl : 'https://doctour-booking-app.onrender.com/api/doctor',
        // Token
        token,
        setToken,

        // doctor
        doctors,
        fetchAllDoctors,

        // User
        userIsLoggedIn,
        setUserLoginStatus,
        setPfp,
        pfp,
        userData,
        setUserData,

        // Appointments
        formatDate,
        fetchAllAppointments,
        appointmentData
  }

    async function fetchAllAppointments(){
        const endPoint = values.appointmentUrl + '/all-appointments'
        const headers = {
            Authorization : `Bearer ${values.token}`
        }
        const response = await axios.get(endPoint, {headers})

        setAppointmentData(response.data.appointments)
    }

  

  useEffect(() => {
    fetchAllDoctors()
  }, [])

  useEffect(() => {
    const validateUser = async ()=> {
        if(!token){
            setUserLoginStatus(false)
            return
        } 
        const endpoint = values.clientUrl + '/verify-user'

        const headers = {
            Authorization : `Bearer ${token}`
        }
        try {
            const response = await axios.get(endpoint, {headers})
            if(response.data.success){
                setUserLoginStatus(true)
            }
        } catch (error) {
            setUserLoginStatus(false)
        }
    }
    validateUser()
  }, [token])

useEffect(() => {
    const fetchProfile = async () => {
        const endpoint = values.clientUrl + '/get-user'
        const headers = {
        Authorization : `Bearer ${token}`
        }
        const response = await axios.get(endpoint, {headers})
        setUserData(response.data.user)
        setPfp(response.data.user?.image)
    }

    fetchProfile()

  }, [userIsLoggedIn])


  return (
    <MyGlobalContext.Provider value ={values}>
        {children}
    </MyGlobalContext.Provider>
    
  )
}

export default GlobalContext
