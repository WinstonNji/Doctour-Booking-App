import React, { useEffect } from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MyGlobalContext } from '../../context/GlobalContext'
import { useContext } from 'react'


function Add_Doctor() {
  const {adminBackendUrl, token} = useContext(MyGlobalContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState(1)
  const [about, setAbout] = useState('')
  const [fee, setFee] = useState('')
  const [address1, setAdress1] = useState('')
  const [address2, setAdress2] = useState('')
  const [imageFile, setImg] = useState(false)

  const doctorAdress = {
    line1: address1,
    line2: address2
  }

  async function addDoctor(event){
    event.preventDefault()
    // endpoint
    const endPoint = adminBackendUrl + '/add-doctor'

    // data
    const formData = new FormData()
    formData.append('name', name),
    formData.append('email', email),
    formData.append('password', password)
    formData.append('speciality', speciality)
    formData.append('degree', degree)
    formData.append('experience', experience),
    formData.append('about', about),
    formData.append('fee', fee)
    formData.append('address', JSON.stringify(doctorAdress))
    formData.append('image', imageFile)

    // headers
    const headers = {
      Authorization : `Bearer ${token}`,
    }

    
    try {

      const toastId = toast.loading('Creating Doctor Profile....')

      const response = await axios.post(endPoint, formData, {headers})

      if(response.data.success){
        toast.update(toastId, {
          render: `${response.data.message}`,
          type: "success",
          isLoading: false,
          autoClose: 5000
        });
        setName('');
        setEmail('');
        setPassword('');
        setSpeciality('');
        setDegree('');
        setExperience('');
        setAbout('');
        setFee('');
        setAdress1('');
        setAdress2('');
        setImg(null);
      }else{
        toast.error(`${response.data.message}`)
      }    
    } catch (error) {
      
    }
    

    
    
  }

  return (
    <div className='ml-48 pt-24 pl-6 h-fit bg-gray-50'>
      <p className='font-bold'>Add Doctor</p>

      <form onSubmit={addDoctor} action="" className='bg-white px-8 py-4 lg:w-[60%] mt-4'>
        <div className='flex gap-2 items-center pb-6'>
          <img className='w-14' src={imageFile? URL.createObjectURL(imageFile) : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232'} alt="" />

          <label className='ring hover:px-8 hover:py-2 px-4 ring-gray-400 rounded-md hover:bg-primary transition-all ease-in-out duration-200 hover:text-white hover:ring-0 hover:cursor-pointer' htmlFor="uploadImg">{imageFile ? 'Change Image' :  'Upload Doctor Image'}</label>

          <input 
            type="file" id='uploadImg' 
            name="image"  
            className='hidden'
            required
            onChange={(e) => setImg(e.target.files[0])}
            
          />
        </div>

        <div className='flex pb-4 gap-8 items-center'> 
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Doctor name</label>
            <input 
              className='ring ring-gray-300  px-2 py-1 border 
            border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs' 
              type="text" 
              placeholder='Name' 
              required
              onChange={(event)=> setName(event.target.value)}
              value={name}
            />
          </div>

          <div className='flex flex-col w-1/2 gap-2'>
            <label htmlFor="">Speciality</label>
            <input 
              className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs px-2 py-1' type="text" 
              placeholder='General physician' required
              onChange={(event)=> setSpeciality(event.target.value)}
              value={speciality}
            />
          </div>
        </div>

        <div className='flex pb-4 gap-8'>
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Doctor Email</label>
            <input 
              className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs px-2 py-1'
              type='email'
              placeholder='Your email' 
              required
              onChange={(event)=> setEmail(event.target.value)}
              value={email}
            />
          </div>

          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Education</label>
            <input 
              className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs px-2 py-1' type="text" placeholder='Education'
              required
              onChange={(event)=> setDegree(event.target.value)}
              value={degree}
            />
          </div>
        </div>

        <div className='flex pb-4 gap-8'>
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Doctor Password</label>
            <input 
              className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs px-2 py-1' type="password" 
              placeholder='Password' required
              onChange={(event)=> setPassword(event.target.value)}
              value={password}
            />
          </div>

          <div className='flex flex-col w-1/2 gap-2'>
            <label htmlFor="">Address</label>
            <input 
              type="text" 
              placeholder='Address 1' className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs px-2 py-1'
            required
            onChange={(event)=> setAdress1(event.target.value)}
            value={address1}
            />


            <input type="text" placeholder='Address 2' className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs px-2 py-1' required
            onChange={(event)=> setAdress2(event.target.value)}
            value={address2}
            />
          </div>
        </div>

        
        <div className='flex flex-col gap-1.5 -mt-14'>
          <label htmlFor="">Experience</label>
          <select 
            className='text-gray-500 border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs w-1/2 px-2 py-1'  
            required
            onChange={(event)=> setExperience(event.target.value)}
            value={experience}
          >
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
            <option value="6">6 years</option>
            <option value="7">7 years</option>
            <option value="8">8 years</option>
            <option value="9">9 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div className='flex flex-col mt-4 gap-2'>
          <label htmlFor="">Fees</label>
          <input 
            className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs w-1/2 px-2 py-1' placeholder='Your fees' 
            type="text" 
            required
            onChange={(event)=> setFee(event.target.value)}
            value={fee}
          />
        </div>

        <div className='flex flex-col mt-4 gap-2'>
          <label htmlFor="">About me</label>
          <textarea 
            className='border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200 rounded-xs px-2 py-1' 
            name="" 
            id=""
            required
            onChange={(event)=> setAbout(event.target.value)}
            value={about}
          ></textarea>
        </div>

        <button className='px-8 bg-primary py-2 rounded-full mt-4 text-white font-bold hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer' type="submit">Add doctor</button>
      </form>
    </div>
  )
}

export default Add_Doctor
