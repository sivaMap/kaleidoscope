import React, { useCallback, useState } from 'react';
import '../css/VolumeSlider.css'; // Import CSS file for styling
import { useDebounce } from '../hooks/useDebounce';

const VolumeSlider2 = ({ isShowRunning }) => {
    const lowVolume = '/images/volumeBar/slider/lowVolume.png';
    const highVolume = '/images/volumeBar/slider/highVolume.png';
    const volumeChanger = 45;
    const debounceTiming = 300;
    const [isSliderEnabled, setSliderEnable] = useState(false);
    const [volume, setVolume] = useState(5);

    const debounceFunction = useCallback(() => {
        // console.log("debounce funntion pass")
    }, [])

    useDebounce(debounceFunction,
        debounceTiming,
        [volume])

    return (
        !isSliderEnabled || !isShowRunning ?
            <div className='w-44 ml-4'>
                <img
                    src={"/images/volumeBar/slider/lowVolume.png"}
                    alt="Low Volume"
                    className='h-[30px]'
                    onClick={() => isShowRunning && setSliderEnable(prev => !prev)}
                />
            </div>
            :
            <div
                className="volume-slider w-44 ml-4 pl-4 pr-0 py-1 rounded-full bg-black bg-opacity-30">
                <img src={volume < volumeChanger ? lowVolume : highVolume} alt="High"
                    className='h-[30px]'
                    onClick={() => isShowRunning && setSliderEnable(prev => !prev)}
                />

                <input type="range" className="slider"
                    min={0} max={200}
                    step={5}
                    value={volume}
                    onChange={(e) => isShowRunning && setVolume(e.target.value)}
                />
            </div>
    );
};

export default VolumeSlider2;