import React from 'react'

const CuratedCard = (props) => {
    const { show, selectedShow, handleShowClick } = props;
    const isSelected = selectedShow[0] === show.title;
    console.log({ isSelected, selectedShow })

    return (
        <div
            className={`flex  space-x-2  rounded-lg p-2 mx-4 ${isSelected ? "bg-white" : ''}`}
            onClick={() => handleShowClick({ showName: show.title })}
        >
            <img src={show.image} alt={show.title} className="w-20 h-20 rounded-md object-cover justify-center" />
            <div className='flex flex-col justify-end'>
                <h3 className={`text-xs ${isSelected ? "text-black" : ""} `}
                    style={{ fontFamily: 'Geometria' }}>
                    {show.title}</h3>
                <p className={`text-xs ${isSelected ? "text-black" : ""}`} style={{ fontFamily: 'Geometria' }}>
                    {show.time}</p>
            </div>
        </div>
    )
}

export default CuratedCard