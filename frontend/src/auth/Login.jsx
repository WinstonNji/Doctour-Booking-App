import React, { use, useContext, useEffect, useState } from 'react'
import { MyGlobalContext } from '../context/GlobalContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate, useLocation} from 'react-router-dom'



function Login() {
  const {adminBackendUrl, setToken, clientUrl, doctorUrl, setUserLoginStatus} = useContext
  (MyGlobalContext)

  // useEffect(() => {
  //   localStorage.removeItem('token')
  //   setToken('')
  // }, [])


  const navigate = useNavigate()
  const location = useLocation()
  const isLogin = location.pathname.startsWith('/login')

  useEffect(() => {
      localStorage.removeItem('token')
      setToken('')
    }, [])

  // Ensure the correct view and header reflect the current route
  useEffect(() => {
      if(location.pathname.startsWith('/admin-login')){
        setDoctorLogin(false)
        setRegister(false)
      }

      if(location.pathname.startsWith('/login')){
        // If navigation provided state to open doctor form, honor it; else default user
        if(location.state && location.state.doctor === true){
          setDoctorLogin(true)
        }else{
          setDoctorLogin(false)
        }
      }
    }, [location.pathname])
 
  const [name, setName] =  useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [doctorLogin, setDoctorLogin] = useState(false)

  async function Login(event){
    event.preventDefault()

    if(register){
      const endPoint = clientUrl + '/user-registration'
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
          navigate('/my-profile')
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
          setRegister(false)
        }
      } catch (error) {
        console.log(error)
      }
      return 
    }

    if(doctorLogin){
      const endPoint = doctorUrl + '/doctor-login'
      const data = {
        email,
        password
      }
      try {
          const response = await axios.post(endPoint, data)
          if(response.data.success){
            setUserLoginStatus(true)
            toast.success(response.data.message)
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setEmail('')
            setPassword('')
            navigate('/doctor-dashboard')
          }else{
            toast.error(response.data.message)
            setDoctorLogin(false)
          } 
      }catch (error) {
            console.log(error)
            toast.error('Something went wrong. Please try again later')
        }

        return
    }
    
    const endPoint = isLogin && !doctorLogin ? clientUrl + '/user-login' : adminBackendUrl + '/admin-login'  

    try {
      const response = await axios.post(endPoint, {
        email : email,
        password : password
      })

      

      if(!response.data.success){
        toast.error(`${response.data.message}`)
        return
      }else{
        toast.success(`${response.data.message}`)
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        setEmail('')
        setPassword('')
        isLogin ? navigate('/my-profile') : navigate('/admin-dashboard')
      }
    } catch (error) {
      // console.error(error)
    }
    
    
    
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-primary'>
        {/* Container */}
      <div className='w-3/4 md:w-1/2 p-12 ring ring-white bg-white rounded-4xl shadow'>

        <p className={`mb-8 text-2xl font-bold text-primary`}>
          {register
            ? 'Register'
            : location.pathname.startsWith('/admin-login')
              ? 'Admin Login'
              : doctorLogin
                ? 'Doctor Login'
                : 'Login'}
        </p>
        
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

            {register ? (
              <div className='-mb-6'>
                <p onClick={() => setRegister(false)} className='text-black'>
                  Already have an account? <span className='text-primary cursor-pointer'>Login</span>
                </p>
              </div>
            ) : doctorLogin ? (
              <div className='flex flex-col gap-2 -mb-6'>
                <div className='flex gap-2'>
                  <p>Are you an admin?</p>
                  <span className='text-primary cursor-pointer' onClick={() => navigate('/admin-login')}>Admin Login</span>
                </div>
                <div className='flex gap-2'>
                  <p>Login as user instead?</p>
                  <span className='text-primary cursor-pointer' onClick={() => setDoctorLogin(false)}>User Login</span>
                </div>
              </div>
            ) : isLogin ? (
              <div className='flex flex-col gap-2 -mb-6'>
                <div className='flex gap-2'>
                  <p className='text-black'>New User?</p>
                  <span onClick={() => setRegister(true)} className='text-primary cursor-pointer'>Register instead</span>
                </div>
                <div className='flex gap-2'>
                  <p>Login as Doctor Instead</p>
                  <span className='text-primary cursor-pointer' onClick={() => setDoctorLogin(true)}>Doctor Login</span>
                </div>
                <div className='flex gap-2'>
                  <p>Are you admin?</p>
                  <span className='text-primary cursor-pointer' onClick={() => { setDoctorLogin(false); navigate('/admin-login') }}>Admin Login</span>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-2 -mb-6'>
                <div className='flex gap-2'>
                  <p>Login as Doctor</p>
                  <span className='text-primary cursor-pointer' onClick={() => navigate('/login', { state: { doctor: true } })}>Doctor Login</span>
                </div>
                <div className='flex gap-2'>
                  <p>Login as User</p>
                  <span className='text-primary cursor-pointer' onClick={() => navigate('/login')}>User Login</span>
                </div>
              </div>
            )}


        </form>
        
      </div>
    </div>
  )
}

export default Login
