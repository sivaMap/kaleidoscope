import React, { useState } from "react";
import CuratedCard from "./cards/CuratedCard";
import { constants } from "../constants";

const shows = [
    {
        title: "Kantha",
        time: "02:30",
        image:
            "https://via.placeholder.com/150",
    },
    {
        title: "Brocade",
        time: "02:30",
        image:
            "https://via.placeholder.com/150",
    },
    {
        title: "Brocadef",
        time: "02:30",
        image:
            "https://via.placeholder.com/150",
    },
    {
        title: "Block Printed",
        time: "02:30",
        image:
            "https://via.placeholder.com/150",
    },
];

const CuratedPlay = ({ setLoadCurate }) => {
    const [currentShow, setCurrentShow] = useState(shows[0]);
    const handleShowClick = ({ showName }) => {
        if (showName.title === currentShow.title) {
            return;
        }
        setCurrentShow(showName)
    }
    const handleEndShow = () => {
        setLoadCurate(constants.loadCurate.show);
    }

    return (
        <div
            className="flex gap-3 ">
            {/* Currently Showing */}
            <div
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                className="w-3/12 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4 text-center">Currently Showing</h2>
                <div className="bg-black p-4 rounded-lg h-2/3">
                    <img
                        src={currentShow.image}
                        alt={currentShow.title}
                        className="mb-4 rounded w-full"
                    />
                    <div className="flex justify-between">
                        <h3 className="text-xl mb-2">{currentShow.title}</h3>
                        <p className="text-sm text-gray-400">{currentShow.time}</p>
                    </div>

                </div>
                <div className="flex justify-center">
                    <button
                        className="mt-4 px-6 py-2 border border-white rounded-full"
                        onClick={handleEndShow}
                    >
                        End Show
                    </button>
                </div>

            </div>

            {/* Choose a different show */}
            <div
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                className="w-9/12 p-4">
                <h2 className="text-lg font-bold mb-4">Choose a different show</h2>
                <div className="grid grid-cols-2 gap-4">
                    {shows.map((show, index) => {
                        if (show.title === currentShow.title) return
                        return < CuratedCard key={index} show={show} selectedShow={currentShow} handleShowClick={handleShowClick} ></CuratedCard>
                    })}
                </div>
            </div >
        </div >
    );
}

export default CuratedPlay;