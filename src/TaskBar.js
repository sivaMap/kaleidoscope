import React from 'react'

const TaskBar = () => {

  return (
    <div      
      className='flex justify-between bg-black bg-opacity-30 w-full h-[80px] flex-shrink-0 flex-none'
    >
      {/* MAP SYMBOL */}
      <div
        className="flex flex-col justify-center w-[180px] h-[80px] -pl-5"
      >
        <img src='/images/map.png' alt='map' className="px-6 py-0" />
      </div>

      {/* TEXT */}
      <div
        className='flex flex-col justify-center'
      >
        <p
          className="font-medium text-white text-3xl"
          style={{ fontFamily: 'Geometria' }}
        >
          KALEIDOSCOPE
        </p>
      </div>

      {/* OPEZEE SYMBOL */}
      <div
        className='flex flex-col justify-center'
      >
        <img src='/images/opezee.png' alt='opezee'
          className='w-[114px] h-[40px] mr-4'
        />
      </div>
    </div>
  )
}

// w-[180px] h-[80px] -pl-5
export default TaskBar