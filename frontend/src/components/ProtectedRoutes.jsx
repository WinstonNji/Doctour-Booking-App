import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom' 
import { MyGlobalContext } from '../context/GlobalContext'
import { useContext } from 'react'
import axios from 'axios'

function ProtectedRoutes() {
    const {token, setToken, adminBackendUrl} = useContext(MyGlobalContext)
    const navigate = useNavigate()
    const [isVerified, setIsVerified] = useState(false)
    useEffect(() => {
        const verifyToken = async () => {
            if(!token){
                navigate('/admin-login')
                return
            }

            try {
                const endpoint = adminBackendUrl + '/admin-verification'
                const headers = {
                    Authorization : `Bearer ${token}`
                }
                const response = await axios.get(endpoint, {headers})

                if(response.data.success){
                    setIsVerified(true)
                    setToken(localStorage.getItem('token'))
                }else{
                    navigate('/admin-login')
                    return 
                }
            } catch (error) {
                console.log(error)
                
            }
        }

        verifyToken()
        
    }, [token, navigate])

    return isVerified ? <Outlet /> : null

    
}



export default ProtectedRoutes
