import React, { useState } from "react";
import CuratedCard from "./cards/CuratedCard";
import { constants } from "../constants";
import { useKaleidoCrud } from "../context/kaleidoscopeCrudContext";

const CuratedPlay = ({ setLoadCurate, selectedShow, setSelectedShow, shows }) => {
    const [currentShow, setCurrentShow] = useState(selectedShow);
    const { toggleShowRun } = useKaleidoCrud();
    const minutes = Math.floor(currentShow?.duration / 60);
    const seconds = Math.floor(currentShow?.duration % 60);

    const handleShowClick = ({ showName }) => {
        if (showName.displayName === currentShow.displayName) {
            return;
        }
        setSelectedShow(showName)
        setCurrentShow(showName)
    }
    const handleEndShow = () => {
        setLoadCurate(constants.loadCurate.show);
        toggleShowRun();
    }

    return (
        <div
            className="flex gap-3 ">
            {/* Currently Showing */}
            <div
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                className="w-3/12 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4 text-center">Currently Showing</h2>
                <div className="bg-black p-4 rounded-lg h-2/3 max-h-60">
                    <img
                        src={`${constants.backendUrl}/curateThumbnail/${currentShow?.displayName}.png`}
                        alt={currentShow.displayName}
                        className="mb-4 rounded w-full"
                    />
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-base mb-2">{currentShow.displayName}</h2>
                        <p className="text-sm text-gray-400">{minutes} : {seconds}</p>
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
                        if (show.displayName === currentShow.displayName) return null;
                        return < CuratedCard key={index} show={show} selectedShow={currentShow} handleShowClick={handleShowClick} ></CuratedCard>
                    })}
                </div>
            </div >
        </div >
    );
}

export default CuratedPlay;