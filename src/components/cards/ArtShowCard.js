import React, { memo } from 'react'
import { constants } from '../../constants';

const ArtShowCard = memo(function ArtworkCard(props) {
    const { artifact } = props;

    return (
        <div className={`rounded-lg shadow-md  p-2 mb-2}`}
        >
            <div className={"h-44  rounded-lg mb-0"} >
                <img src={`${constants.backendUrl}/artThumbnail/${artifact?.displayName}.png`} alt={artifact?.displayName}
                    className="w-full h-full rounded-lg object-cover " />
            </div>
            <h2 className={`text-center`}>{artifact?.displayName}</h2>
        </div>
    )
});

export default ArtShowCard