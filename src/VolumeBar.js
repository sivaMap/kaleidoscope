import React from 'react'
import VolumeSlider from './components/VolumeSlider'
import VolumeSlider2 from './components/VolumeSlider2'

const VolumeBar = () => {
  return (
    <div className='bg-black bg-opacity-30 w-full h-[50px] p-1 text-center text-2xl flex-shrink-0 flex-none flex justify-between'>
      {/* class="flex flex-col justify-center w-[180px] h-[80px] -pl-5" */}
      {/* <VolumeSlider/> */}

      <div className='flex flex-col justify-center'>
        <VolumeSlider2 />
      </div>

      <div className='flex flex-col justify-center'>
        <img
          src={"/images/volumeBar/play.png"} alt="Low Volume"
          className='h-[30px]' />
      </div>

      <div className='flex flex-col justify-center'>
        <div className='flex gap-4 mr-2'>
          <img
            src={"/images/volumeBar/reset.png"} alt="r"
            className='h-[30px]' />
          <img
            src={"/images/volumeBar/cancel.png"} alt="c"
            className='h-[30px]' />
        </div>
      </div>

    </div>
  )
}

export default VolumeBar