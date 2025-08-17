import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets_frontend/assets'

export const MyGlobalContext = createContext()

function GlobalContext({children}) {

    const [token, setToken] = useState(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null )

    const [doctors, setDoctors] = useState([])

    const [userIsLoggedIn, setUserLoginStatus] = useState(false)

    const [pfp, setPfp] = useState(null)
    
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

    const fetchAllDoctors = async () => {
        console.log('called') 
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

  const values = {
        adminBackendUrl : 'http://localhost:4000/api/admin',
        generalUrl : 'http://localhost:4000/api/doctourApp/general',
        clientUrl : 'http://localhost:4000/api/user',
        token,
        setToken,
        doctors,
        userIsLoggedIn,
        setUserLoginStatus,
        setPfp,
        pfp,
        userData,
        fetchAllDoctors
  }

  

  useEffect(() => {
      fetchAllDoctors()
  }, [])

  useEffect(() => {
    const validateUser = async ()=> {
        if(!token) setUserLoginStatus(false)
        
        const endpoint = values.clientUrl + '/verify-user'

        const headers = {
            Authorization : `Bearer ${token ? token :null}`
        }
        try {
            const response = await axios.get(endpoint, {headers})
            console.log(response)
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
    console.log('called')
    const fetchProfile = async () => {
        const endpoint = values.clientUrl + '/get-user'
        const headers = {
        Authorization : `Bearer ${token}`
        }
        const response = await axios.get(endpoint, {headers})
        setUserData(response.data.user)
        setPfp(response.data.user.image)
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
