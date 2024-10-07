import React, { memo } from 'react'
import { constants } from '../../constants';

const ArtworkCard = memo(function ArtworkCard(props) {
    const { artifact, selectedArtificats, handleArtifactSelect, handleArtificateUndoSelect } = props;
    const isSelected = selectedArtificats.some(selectedArtificat => selectedArtificat?.displayName === artifact?.displayName);

    return (
        <div className={`rounded-lg shadow-md  p-2 mb-2 ${isSelected ? "bg-white" : ""}`}
            onClick={() => {
                isSelected ? handleArtificateUndoSelect({ artifact }) :
                    handleArtifactSelect({ artifact });
            }}>
            <div className={"h-36  rounded-lg mb-0"} >
                <img src={`${constants.backendUrl}/artThumbnail/${artifact?.displayName}.png`} alt={artifact?.displayName}
                    className="w-full h-full rounded-lg object-cover " />
            </div>
            <h2 className={`text-center ${isSelected ? "text-black" : ""}`}>{artifact?.displayName}</h2>
        </div>
    )
});

export default ArtworkCard



