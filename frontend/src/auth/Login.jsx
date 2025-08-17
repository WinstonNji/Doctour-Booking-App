import React, { useContext, useEffect, useState } from 'react'
import { MyGlobalContext } from '../context/GlobalContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate, useLocation} from 'react-router-dom'



function Login() {
  const {adminBackendUrl, setToken, clientUrl, setUserLoginStatus} = useContext
  (MyGlobalContext)

  const navigate = useNavigate()
  const isLogin = useLocation().pathname.startsWith('/login')
 
  const [name, setName] =  useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)

  async function Login(event){
    event.preventDefault()

    if(register){
      const endPoint = clientUrl + '/user-registration'
      console.log(name,email,password)
      try {
        const response = await axios.post(endPoint, {
          name,
          email,
          password
        })
        if(response.data.success){
          setUserLoginStatus(true)
          toast.success(response.data.message)
          setName('')
          setEmail('')
          setPassword('')
        }else{
          toast.error(response.data.message)
          setRegister(false)
        }
      } catch (error) {
        console.log(error)
      }
      return 
    }

    
    const endPoint = isLogin ? clientUrl + '/user-login' : adminBackendUrl + '/admin-login'  
  
    try {
      const response = await axios.post(endPoint, {
        email : email,
        password : password
      })

      console.log(response)

      if(!response.data.success){
        toast.error(`${response.data.message}`)
        return
      }else{
        toast.success(`${response.data.message}`)
        sessionStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        setEmail('')
        setPassword('')
        isLogin ? navigate('/') : navigate('/admin-dashboard')
      }
    } catch (error) {
      // console.error(error)
    }
    
    
    
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-primary'>
        {/* Container */}
      <div className='w-3/4 md:w-1/2 p-12 ring ring-white bg-white rounded-4xl shadow'>

        <p className={`mb-8 text-2xl font-bold underline ${register ? 'hidden' : null}`}>{isLogin ? 'Login' : 'Admin-Login'}</p>

        <p className={`mb-8 text-2xl font-bold underline ${!register ? 'hidden' : null}`}>{!register ? 'Login' : 'Register'}</p>
        
        <form onSubmit={Login} action="" className='flex flex-col gap-8'>

            <div className={` flex-col gap-2 ${register ? 'flex' : 'hidden'}`}>
                <label htmlFor="name">Name</label>
                <input
                  className="
                    border
                    border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200
                    ease-in-out
                    px-2 py-2 rounded-xl
                    "
                  type="text"
                  id="name"
                  placeholder='Enter your username'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required = {register}

                />

            </div>


            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input
                  className="
                    border
                    border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200
                    ease-in-out
                    px-2 py-2 rounded-xl
                    "
                  type="email"
                  id="email"
                  placeholder='Enter your email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password</label>
                <input
                  className="
                    border 
                    border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xl
                    px-2 py-2 
                    "
                  type="password"
                  id="password"
                  placeholder='Enter your password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
            </div>

            <button  className='px-8 py-2 bg-primary rounded-full text-white font-semibold hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer' type="submit">
                {register ? 'Register' : 'Login'}
            </button>

            <div className={`text-primary cursor-pointer ${!isLogin ? 'hidden' : 'flex gap-2'}`}>
                {
                  !register && (
                    <p className='text-black'>
                      New User? <span onClick={() => setRegister(true)} className='text-primary cursor-pointer'>
                          {!register ? 'Register instead' : 'Login Instead'}
                      </span>
                    </p> 
                  )
                } 

                {
                  register && (
                    <p onClick={() => setRegister(false)} className='text-black'  >Already have and account? <span className={`text-primary cursor-pointer `}>Login Instead</span></p>
                    
                  )
                }
                
            </div>

        </form>
        
      </div>
    </div>
  )
}

export default Login
