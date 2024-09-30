import React, { useState } from 'react';
import CuratedCard from './CuratedCard';
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
    const [selectedShow, setSelectedShow] = useState([]);
    // console.log({selectedShow})
    const handleShowClick = ({ showName }) => {
        if (showName === selectedShow[0]) {
            setSelectedShow([]);
            return;
        }
        setSelectedShow([showName])
    }

    return (
        <div className="bg-black bg-opacity-30 text-white p-4 rounded-lg  max-w-64  max-h-80">
            <h2 className="text-lg font-bold mb-4"
                style={{ fontFamily: 'Geometria' }}>
                Curated Shows</h2>
            <div className="custom-scroll space-y-1 overflow-auto h-[calc(17rem)]  -mt-3 -ml-4 mb-4" >
                {shows.map((show, index) => (
                    <CuratedCard key={index} show={show} selectedShow={selectedShow} handleShowClick={handleShowClick}></CuratedCard>
                ))}
            </div>            
        </div>
    );
};

export default CuratedShows;
