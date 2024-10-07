import React, { useCallback, useEffect, useState } from 'react';
import '../css/VolumeSlider.css';
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

    useEffect(() => {
        setSliderEnable(false);
    }, [isShowRunning])

    return (
        !isSliderEnabled || !isShowRunning ?
            <div className='w-40 ml-2 pl-2 pr-0 py-1 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 38" fill="none"
                    onClick={() => isShowRunning && setSliderEnable(prev => !prev)}>
                    <path d="M0 25.9999V11.9999H9.33333L21 0.333252V37.6666L9.33333 25.9999H0ZM25.6667 28.3333V9.54992C27.4167 10.3666 28.8264 11.6305 29.8958 13.3416C30.9653 15.0527 31.5 16.9388 31.5 18.9999C31.5 21.061 30.9653 22.9277 29.8958 24.5999C28.8264 26.2721 27.4167 27.5166 25.6667 28.3333ZM16.3333 11.6499L11.3167 16.6666H4.66667V21.3333H11.3167L16.3333 26.3499V11.6499Z" fill="#BABABA" />
                </svg>
            </div>
            :
            <div
                className="volume-slider w-40  pl-2 ml-2 pr-0 py-1 rounded-full bg-black bg-opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 32 38" fill="none"
                    onClick={() => isShowRunning && setSliderEnable(prev => !prev)}>
                    <path d="M0 25.9999V11.9999H9.33333L21 0.333252V37.6666L9.33333 25.9999H0ZM25.6667 28.3333V9.54992C27.4167 10.3666 28.8264 11.6305 29.8958 13.3416C30.9653 15.0527 31.5 16.9388 31.5 18.9999C31.5 21.061 30.9653 22.9277 29.8958 24.5999C28.8264 26.2721 27.4167 27.5166 25.6667 28.3333ZM16.3333 11.6499L11.3167 16.6666H4.66667V21.3333H11.3167L16.3333 26.3499V11.6499Z" fill="#BABABA" />
                </svg>


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