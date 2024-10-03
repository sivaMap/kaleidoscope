import React from 'react'

const CuratedCard = (props) => {
    const { show, selectedShow, handleShowClick } = props;
    const isSelected = selectedShow === show.title;

    return (
        <div key={crypto.randomUUID()}
            className={`flex gap-4 bg-black rounded-lg  shadow-md max-w-md p-4 ${isSelected ? "border-white border-2" : ""}`}
            onClick={() => handleShowClick({ showName: show })}
        >
            {/* Image Section */}            
            <div >
                <img
                    className="w-28 h-24 object-cover rounded-md"
                    src={show.image}
                    alt={show.title}
                />
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-end w-fit">
                <h2 className="text-white text-base font-semibold">{show.title}</h2>
                <p className="text-gray-400 text-sm mt-1">{show.time}</p>
            </div>
        </div>
    )
}

export default CuratedCard