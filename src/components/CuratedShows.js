import React, { useEffect, useState } from 'react';
import CuratedCard from './cards/CuratedCard';
import '../css/customSCroll.css'
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';
import { constants } from '../constants';
import CuratedPlay from './CuratedPlay';

const CuratedShows = () => {
    // const shows1 = [
    //     {
    //         title: "Intro",
    //         time: "2 : 10",
    //         image: "https://via.placeholder.com/150",
    //     },
    //     {
    //         title: "Kantha Work",
    //         time: "2 : 10",
    //         image: "https://via.placeholder.com/150",
    //     },
    //     {
    //         title: "Block Printing",
    //         time: "2 : 50",
    //         image: "https://via.placeholder.com/150",
    //     },
    //     {
    //         title: "Blockj Printing",
    //         time: "4 : 30",
    //         image: "https://via.placeholder.com/150",
    //     },
    // ];

    //only single CURATEDSHOW show will be selected
    const [selectedShow, setSelectedShow] = useState({});
    const [shows, setShows] = useState([]);
    const [loadCurate, setLoadCurate] = useState(constants.loadCurate.show);
    const { navigateHomeScreen, toggleShowRun } = useKaleidoCrud();

    //Fetch all the shows from server
    useEffect(() => {        
        fetch(`${constants.backendUrl}/curate/videos`)
            .then(response => response.json())
            .then(data => setShows([...data]))
            .catch(error => console.error('Error fetching apps:', error));
    }, []);

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
                        <button className='bg-black py-2 px-3 rounded-full' onClick={navigateHomeScreen}>
                            {/* <img
                                src={'./images/backButtonArrow.png'}
                                alt='<'
                                className='w-5 h-5'
                            /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 15 24" fill="none">
                                <path d="M12.1337 23.4235L0.382256 11.8353L12.1337 0.24707L14.2196 2.30398L4.55402 11.8353L14.2196 21.3666L12.1337 23.4235Z" fill="white" />
                            </svg>
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
                            onClick={() => {
                                if (!selectedShow) return
                                setLoadCurate(constants.loadCurate.play)
                                toggleShowRun();
                            }}>
                            Start Show
                        </button>
                    </div>
                </div>
            )
                break;
            case constants.loadCurate.play: view.push(
                <CuratedPlay key={"CuratePlay"}
                    setLoadCurate={setLoadCurate}
                    selectedShow={selectedShow} setSelectedShow={setSelectedShow}
                    shows={shows}
                />
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