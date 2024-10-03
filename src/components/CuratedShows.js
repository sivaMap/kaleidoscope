import React, { useState } from 'react';
import CuratedCard from './cards/CuratedCard';
import '../css/customSCroll.css'

const CuratedShows = () => {
    const shows = [
        {
            title: "Intro",
            time: "2 Minutes",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Kantha Work",
            time: "2 Minutes",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Block Printing",
            time: "2 Minutes",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Blockj Printing",
            time: "4 Minutes",
            image: "https://via.placeholder.com/150",
        },
    ];

    //only single CURATEDSHOW show will be selected
    const [selectedShow, setSelectedShow] = useState('');
    
    const handleShowClick = ({ showName }) => {
        if (showName === selectedShow) {
            setSelectedShow();
            return;
        }
        setSelectedShow(showName)
    }

    return (
        <div className='relative flex flex-col'>
            <div className='flex gap-4  items-center'>
                <button className='bg-black p-3 rounded-full'>
                    <img
                        src={'./images/backButtonArrow.png'}
                        alt='<'
                        className='w-5 h-5'
                    />
                </button>

                <h2 className="text-3xl"
                    style={{ fontFamily: 'Geometria' }}>
                    Curated Shows
                </h2>
            </div>

            <div className="grid grid-cols-3 gap-x-5 gap-y-5 px-4 pb-4 mt-6 h-[calc(15rem)] custom-scroll overflow-auto">
                {shows.map((show, index) => (
                    <CuratedCard key={index} show={show} selectedShow={selectedShow} handleShowClick={handleShowClick}></CuratedCard>
                ))}
            </div>
            <div className='flex justify-end'
                style={{ fontFamily: 'Geometria' }}>
                <button className='mt- border-white border-2 rounded-full px-4 py-2'>Start Show</button>
            </div>
        </div>
    );


};

export default CuratedShows;