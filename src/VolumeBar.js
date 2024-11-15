import React, { useEffect, useState } from 'react'
import VolumeSlider from './components/VolumeSlider'
import VolumeSlider2 from './components/VolumeSlider2'

const VolumeBar = ({ isShowRunning }) => {
  // const [play, setPlay] = useState(true);
  const [play, setPlay] = useState(isShowRunning);  
  useEffect(() => setPlay(true), [isShowRunning]);
  
  return (
    <div className='bg-black bg-opacity-30 w-full h-[50px] p-1 text-center text-2xl flex-shrink-0 flex-none flex justify-between'>
      {/* class="flex flex-col justify-center w-[180px] h-[80px] -pl-5" */}
      {/* <VolumeSlider/> */}

      <div className={`flex flex-col justify-center ${!isShowRunning ? "opacity-30" : ""}`}>
        <VolumeSlider2 isShowRunning={isShowRunning} />
      </div>

      <div className={`flex flex-col justify-center ${!isShowRunning ? "opacity-30" : ""}`}>
        <img
          // src={!isShowRunning || play ? "/images/volumeBar/play.png" : "/images/volumeBar/pause.png"}
          // src={!isShowRunning || play ? "/images/volumeBar/play.png" : "/images/volumeBar/pause.png"}
          src={play ? "/images/volumeBar/play.png" : "/images/volumeBar/pause.png"}
          alt={play ? "Play" : "Pause"}
          className='h-[30px]'
          onClick={() => isShowRunning ? setPlay(prev => !prev) : setPlay(true)}
        />
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