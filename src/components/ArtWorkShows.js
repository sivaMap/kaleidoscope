import React, { useEffect, useState } from 'react'
import ArtShowCard from './cards/ArtShowCard';
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';
import { constants } from '../constants';

const ArtWorkShows = ({ selectedArtificats, setSelectedArtifacts, setLoadArt }) => {
    const { toggleShowRun } = useKaleidoCrud();

    const handleEndShow = () => {
        fetch(`${constants.backendUrl}/art/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "control": "stop"
            }),
        })
            .catch(error => console.error('Error fetching apps:', error));
        setSelectedArtifacts([]);
        setLoadArt(constants.loadArt.show);
        toggleShowRun();
    }
    
    useEffect(() => {        
        fetch(`${constants.backendUrl}/art/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedArtificats: selectedArtificats,
            }),
        })
            .catch(error => console.error('Error fetching apps:', error));

    }, [])

    return (
        <div className='relative '>

            <h2 className="text-2xl "
                style={{ fontFamily: 'Geometria' }}>
                Artworks in the Current Show
            </h2>

            <div className="grid grid-cols-5 gap-x-5 -ml-2 mt-4 px-4 h-[calc(17rem)] custom-scroll overflow-auto">
                {selectedArtificats?.map((artifact, index) => (
                    <ArtShowCard key={index} artifact={artifact}
                    />
                ))}
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-2 border border-white rounded-full" onClick={handleEndShow}>
                    End Show
                </button>
            </div>

        </div>
    )
}

export default ArtWorkShows