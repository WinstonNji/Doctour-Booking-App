import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MyGlobalContext } from '../../context/GlobalContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'

const Doctor_Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { generalUrl, adminBackendUrl, token } = useContext(MyGlobalContext)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    image: '',
    speciality: '',
    experience: '',
    about: '',
    address: { line1: '', line2: '' }
  })

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const endpoint = generalUrl + '/getAllDoctors'
        const headers = { Authorization: `Bearer ${token}` }
        const res = await axios.get(endpoint, { headers })
        const doc = (res.data.doctors || []).find(d => d._id === id)
        if (!doc) {
          toast.error('Doctor not found')
          navigate('/admin-doctor-list')
          return
        }

        const addressObj = (() => {
          try { return typeof doc.address === 'string' ? JSON.parse(doc.address) : (doc.address || { line1: '', line2: '' }) } catch { return { line1: '', line2: '' } }
        })()

        setForm({
          name: doc.name || '',
          email: doc.email || '',
          image: doc.image || '',
          speciality: doc.speciality || '',
          experience: String(doc.experience || ''),
          about: doc.about || '',
          address: addressObj
        })
      } catch (e) {
        toast.error('Failed to load doctor')
      } finally {
        setLoading(false)
      }
    }
    fetchDoctor()
  }, [id])

  const handleSave = async () => {
    try {
      setSaving(true)
      const endpoint = `${adminBackendUrl}/update-doctor/${id}`
      const headers = { Authorization: `Bearer ${token}` }

      // If your backend expects multipart for image
      const formData = new FormData()
      if (imageFile) formData.append('image', imageFile)
      formData.append('address', JSON.stringify(form.address))
      formData.append('speciality', form.speciality)
      formData.append('experience', form.experience)
      formData.append('about', form.about)

      const res = await axios.patch(endpoint, formData, { headers })
      if (!res.data.success) return toast.error(res.data.message || 'Update failed')
      toast.success('Doctor updated')
      navigate('/admin-doctor-list')
    } catch (e) {
      toast.error('Failed to update doctor')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className='ml-48 pt-24 pl-6'><Loading label="Loading doctor..." /></div>

  return (
    <div className='ml-48 pt-24 pl-6 pr-6 bg-gray-50 min-h-screen pb-20'>
      <div className='max-w-4xl'>
        <div className='mb-4'>
          <button onClick={() => navigate('/admin-doctor-list')} className='text-sm text-blue-600 hover:underline'>&larr; Back to Doctors</button>
        </div>
        <div className='bg-white rounded-xl shadow p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl md:text-2xl font-bold'>Edit Doctor</h2>
            <span className='text-xs md:text-sm text-gray-500'>Admin only</span>
          </div>

          {/* Header with avatar + name/email (read-only) */}
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center border-b pb-6'>
            <div className='flex items-start gap-4'>
              <img className='w-24 h-24 md:w-28 md:h-28 rounded-lg object-cover ring ring-gray-200' src={imageFile ? URL.createObjectURL(imageFile) : form.image} alt='' />
              <div>
                <p className='font-semibold text-gray-800'>{form.name || '—'}</p>
                <p className='text-sm text-gray-500'>{form.email || '—'}</p>
                <label className='mt-3 inline-block'>
                  <span className='text-xs text-gray-600 block mb-1'>Change photo</span>
                  <input type='file' accept='image/*' onChange={e => setImageFile(e.target.files?.[0] || null)} className='block text-sm' />
                </label>
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs uppercase tracking-wide text-gray-500 mb-1'>Speciality</label>
              <input className='ring ring-gray-200 focus:ring-primary focus:outline-none w-full px-3 py-2 rounded' value={form.speciality} onChange={e => setForm(prev => ({ ...prev, speciality: e.target.value }))} placeholder='e.g. Cardiologist' />
            </div>
            <div>
              <label className='block text-xs uppercase tracking-wide text-gray-500 mb-1'>Experience (years)</label>
              <input className='ring ring-gray-200 focus:ring-primary focus:outline-none w-full px-3 py-2 rounded' value={form.experience} onChange={e => setForm(prev => ({ ...prev, experience: e.target.value }))} placeholder='e.g. 5' />
            </div>

            <div className='md:col-span-2'>
              <label className='block text-xs uppercase tracking-wide text-gray-500 mb-1'>Address Line 1</label>
              <input className='ring ring-gray-200 focus:ring-primary focus:outline-none w-full px-3 py-2 rounded' value={form.address.line1} onChange={e => setForm(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} placeholder='Street address, P.O. box' />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-xs uppercase tracking-wide text-gray-500 mb-1'>Address Line 2</label>
              <input className='ring ring-gray-200 focus:ring-primary focus:outline-none w-full px-3 py-2 rounded' value={form.address.line2} onChange={e => setForm(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} placeholder='Apartment, suite, unit, building, floor, etc.' />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-xs uppercase tracking-wide text-gray-500 mb-1'>About</label>
              <textarea className='ring ring-gray-200 focus:ring-primary focus:outline-none w-full px-3 py-2 h-32 rounded resize-none' value={form.about} onChange={e => setForm(prev => ({ ...prev, about: e.target.value }))} placeholder='Short professional bio' />
            </div>
          </div>

          <div className='mt-6 flex flex-col sm:flex-row gap-3'>
            <button disabled={saving} onClick={handleSave} className='px-6 py-2 rounded bg-primary text-white hover:opacity-90 disabled:opacity-60'>
              {saving ? <span className='flex items-center gap-2'><span className='inline-block w-4 h-4 border-2 border-gray-200 border-t-white rounded-full animate-spin'></span> Saving...</span> : 'Save changes'}
            </button>
            <button onClick={() => navigate('/admin-doctor-list')} className='px-6 py-2 rounded ring-1 ring-gray-300 text-gray-700 hover:bg-gray-50'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctor_Edit


