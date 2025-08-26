import React from 'react'

function Loading({ label = 'Loading...', small = false, fullscreen = false }) {
  const size = small ? 'w-6 h-6 border-2' : 'w-12 h-12 border-4'
  const wrapper = fullscreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/60 z-50'
    : 'flex items-center justify-center py-6'

  return (
    <div className={wrapper}>
      <div className={`flex items-center gap-3 text-gray-600`}>
        <span className={`inline-block rounded-full border-gray-300 border-t-primary animate-spin ${size}`}></span>
        {!small && <span className='font-medium'>{label}</span>}
      </div>
    </div>
  )
}

export default Loading


