import React from 'react'

const LoadingCard = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className="bg-dark-100 shadow-inner shadow-light-100/50  h-80 sm:w-60 rounded-xl animate-pulse"></div>
      <div className="flex flex-col gap-1">
         <div className="bg-dark-100 shadow-inner shadow-light-100/50 sm:w-60 animate-pulse h-5 rounded-md" ></div>
          <div className="bg-dark-100 shadow-inner shadow-light-100/50  sm:w-60 animate-pulse h-3 rounded-md" ></div>
      </div>
      
    </div>
  )
}

export default LoadingCard
