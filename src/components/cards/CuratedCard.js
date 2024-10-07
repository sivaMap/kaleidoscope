import React from 'react'
import { constants } from '../../constants';

const CuratedCard = (props) => {
    const { show, selectedShow, handleShowClick } = props;
    const isSelected = selectedShow?.displayName === show?.displayName;

    const minutes = Math.floor(show?.duration / 60);
    const seconds = Math.floor(show?.duration % 60);

    return (
        <div key={crypto.randomUUID()}
            className={`flex gap-4 bg-black rounded-lg  shadow-md max-w-md p-4 ${isSelected ? "border-white border-2" : "border-transparent border-2"}`}
            onClick={() => handleShowClick({ showName: show })}
        >
            {/* Image Section */}
            <div className='h-24'>
                <img
                    className="w-28 h-24 object-cover rounded-md"
                    src={`${constants.backendUrl}/curateThumbnail/${show?.displayName}.png`}
                    alt={show.displayName}
                />
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-end w-fit">
                <h2 className="text-white text-base font-semibold">{show?.displayName}</h2>
                <p className="text-gray-400 text-sm mt-1">{minutes} : {seconds}</p>
            </div>
        </div>
    )
}

export default CuratedCard