import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react'
import { useContext } from "react";
import { MyGlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from './Loading'

function DoctorProtectRoute() {
    const {token, doctorUrl} = useContext(MyGlobalContext)
    const [doctorIsAuthorized, setDoctorAuthorization] = useState(false)
    const navigate = useNavigate()

    const verifyDoctor = async () => {
        console.log(token, '----token')

        const endPoint = doctorUrl + '/verify-doctor-token'
        const headers = {Authorization : `Bearer ${token}`}
        const response = await axios.get(endPoint, {headers})

        if(!response.data.success){
            toast.error(response.data.message)
            navigate('/login')
            return
        }

        setDoctorAuthorization(true)
    }

    useEffect(() => {
        verifyDoctor()

    }, [])

  return doctorIsAuthorized ? <Outlet /> : <Loading label="Checking doctor access..." />
}

export default DoctorProtectRoute
