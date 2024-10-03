import React, { useState } from 'react';
import CuratedCard from './cards/CuratedCard';
import '../css/customSCroll.css'
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';
import { constants } from '../constants';
import CuratedPlay from './CuratedPlay';

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
    const [loadCurate, setLoadCurate] = useState(constants.loadCurate.show);
    const { navigateHomeScreen } = useKaleidoCrud();

    const handleShowClick = ({ showName }) => {
        if (showName === selectedShow) {
            setSelectedShow();
            return;
        }
        setSelectedShow(showName)
    }

    // Either one of Three bodies or cases will be loaded based on loadName state
    const loadCurateScene = () => {
        let view = [];
        switch (loadCurate) {
            case constants.loadCurate.show: view.push(
                <div className='relative flex flex-col' key={"CurateShowDefault"}>
                    <div className='flex gap-4  items-center'>
                        <button className='bg-black p-3 rounded-full' onClick={navigateHomeScreen}>
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
                        <button
                            className='mt- border-white border-2 rounded-full px-4 py-2'
                            onClick={() => setLoadCurate(constants.loadCurate.play)}>Start Show</button>
                    </div>
                </div>
            )
                break;
            case constants.loadCurate.play: view.push(
                <CuratedPlay key={"CuratePlay"}
                    setLoadCurate={setLoadCurate} />
            )
                break;
            default: break
        }
        return view;
    }

    return (
        loadCurateScene()
    );


};

export default CuratedShows;