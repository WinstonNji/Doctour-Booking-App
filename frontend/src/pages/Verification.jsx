import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { MyGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Verification() {

  const {paymentUrl, token} = useContext(MyGlobalContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const appointmentId = searchParams.get('appointmentId')
    const transactionId = searchParams.get('transaction_id')

    if (!token || !appointmentId || !transactionId) return;

    async function verifyTransaction(appointmentId, transactionId){
      const endPoint = paymentUrl + `/verify/${transactionId}`
        

      const config = {
        headers : {
          Authorization : `Bearer ${token}`
        },
        params : {
          appointmentId
        }
      
      }
      const response = await axios.get(endPoint, config)
      
      if(!response.data.success){
        toast.error(response.data.message)
      }

      toast.success(response.data.response)
      navigate('/my-appointments')
    }

    verifyTransaction(appointmentId,transactionId)
  }, [searchParams])

  return (    
    <div className='h-screen w-screen bg-primary flex flex-col items-center justify-center'>
      <h1 className='font-bold text-5xl text-white mb-4'>Verifying your transaction....</h1>
      <p className='font-bold text-4xl'>Please do not close the page</p>
    </div>
  )
}

export default Verification
