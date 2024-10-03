import React, { memo } from 'react'

const ArtShowCard = memo(function ArtworkCard(props) {
    const { artifact, selectedArtificats, handleArtifactSelect, handleArtificateUndoSelect } = props;
    const isSelected = selectedArtificats.some(selectedArtificat => selectedArtificat.id === artifact.id);

    return (
        <div className={`rounded-lg shadow-md  p-2 mb-2 ${isSelected ? "bg-white" : ""}`}
            onClick={() => {
                isSelected ? handleArtificateUndoSelect({ artifact }) :
                    handleArtifactSelect({ artifact });
            }}>
            <div className={"h-44  rounded-lg mb-0"} >
                <img src={"https://via.placeholder.com/150"} alt={artifact.name}
                    className="w-full h-full rounded-lg object-cover " />
            </div>
            <h2 className={`text-center ${isSelected ? "text-black" : ""}`}>{artifact.name}</h2>
        </div>
    )
});

export default ArtShowCard