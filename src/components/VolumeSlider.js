import React, { useState } from 'react';

const VolumeSlider = () => {
    const volumeImg = '/images/volumeBar/slider/lowVolume.png';
    const lineImg = '/images/volumeBar/slider/line.png';
    const ellipseImg = '/images/volumeBar/slider/elipse.png';

    const [volume, setVolume] = useState(50); // Initial volume value (0-100)

    const handleSliderChange = (e) => {
        setVolume(e.target.value);
    };

    return (
        <div className="flex items-center justify-center flex-col h-4 w-8">
            <img src={volumeImg} alt="Volume Icon" className="mb-2 w-16" />
            <img src={lineImg} alt="Slider Line" className="w-full" />
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleSliderChange}
                className="appearance-none w-full h-2 bg-transparent outline-none"
                style={{ background: `linear-gradient(to right, #4caf50 ${volume}%, #ddd ${volume}%)` }}
            />
            <img src={ellipseImg} alt="Slider Handle" className="absolute transform -translate-x-1/2 w-6 h-6" style={{ left: `${volume}%` }} />
            <span className="mt-2 text-center">Volume: {volume}</span>
        </div>
    );
};

export default VolumeSlider;
