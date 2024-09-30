import React, { useState } from 'react';
import './VolumeSlider.css'; // Import CSS file for styling

const VolumeSlider2 = () => {
    const lowVolume = '/images/volumeBar/slider/lowVolume.png';
    const [isSliderEnabled, setSliderEnable] = useState(false);
    const [volume, setVolume] = useState(5);
    console.log("volume", volume);

    return (
        !isSliderEnabled ?
            <div className='w-10'>
                <img
                    src={"/images/volumeBar/slider/lowVolume.png"}
                    alt="Low Volume"
                    className='h-[30px]'
                    onClick={() => setSliderEnable(prev => !prev)}
                />
            </div>
            :
            <div className="volume-slider w-10">
                <img src={lowVolume} alt="Low Volume"
                    className='h-[30px]'
                    onClick={() => setSliderEnable(prev => !prev)}
                />
                <input type="range" className="slider"
                    // min={0} max={100} step={1}
                    // value={volume} 
                    onClick={(e) => setVolume(e.target.value)}
                />
            </div>
    );
};

export default VolumeSlider2;