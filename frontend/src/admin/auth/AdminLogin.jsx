import React from 'react'



function AdminLogin() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-primary'>
        {/* Container */}
      <div className='w-3/4 p-12 ring ring-white bg-white rounded-4xl shadow'>
        <form action="" className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input
                  className="
                    border
                    border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200
                    ease-in-out
                    px-2 py-2 rounded-xl
                    "
                  type="text"
                  id="email"
                />

            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password</label>
                <input
                  className="
                    border 
                    border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200
                    px-2 py-2 rounded-xl
                    "
                  type="text"
                  id="password"
                />
            </div>

            <button className='px-8 py-2 bg-primary rounded-full text-white font-semibold hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer' type="submit">
                Login
            </button>

        </form>
        
      </div>
    </div>
  )
}

export default AdminLogin
