import React, { useState } from 'react'
import ArtworkCard from './cards/ArtworkCard';

const ArtWork = () => {
    const artifacts = [
        { id: 1, name: 'Artifact 1' },
        { id: 2, name: 'Artifact 2' },
        { id: 3, name: 'Artifact 3' },
        { id: 4, name: 'Artifact 4' },
        { id: 5, name: 'Artifact 5' },
        { id: 6, name: 'Artifact 6' },
        { id: 7, name: 'Artifact 7' },
        { id: 8, name: 'Artifact 8' },
        { id: 9, name: 'Artifact 9' },
        { id: 10, name: 'Artifact 10' },
        { id: 11, name: 'Artifact 11' },
        { id: 12, name: 'Artifact 12' },
    ];

    //only five artifacts can be selected
    const [selectedArtificats, setSelectedArtifacts] = useState([]);
    const handleArtifactSelect = ({ artifact }) => {
        if (selectedArtificats.length < 5) {
            setSelectedArtifacts(prev => [...prev, artifact]);
        }
    }
    //unselect the selected artifact
    const handleArtificateUndoSelect = ({ artifact }) => {
        const filteredArtifacts = selectedArtificats.filter(selectedArtificat => selectedArtificat.id !== artifact.id);
        setSelectedArtifacts([...filteredArtifacts]);
    }

    return (
        <div className='relative '>
            <div className='flex justify-between'>
                <div className='flex gap-4  items-center'>
                    <button className='bg-black p-3 rounded-full'>
                        <img
                            src={'./images/backButtonArrow.png'}
                            alt='<'
                            className='w-5 h-5'
                        />
                    </button>

                    <h2 className="text-2xl"
                        style={{ fontFamily: 'Geometria' }}>
                        Select any 5 artworks
                    </h2>
                </div>
                <div className='flex justify-end'
                    style={{ fontFamily: 'Geometria' }}>
                    <button className='mt- border-white border-2 rounded-full px-4 py-2'>Start Show</button>
                </div>
            </div>


            <div className="grid grid-cols-4 gap-x-5 -ml-2 mt-4 px-4 pb-4 h-[calc(19rem)] custom-scroll overflow-auto">
                {artifacts.map((artifact) => (
                    <ArtworkCard key={artifact.id} artifact={artifact}
                        selectedArtificats={selectedArtificats}
                        handleArtifactSelect={handleArtifactSelect}
                        handleArtificateUndoSelect={handleArtificateUndoSelect}
                    />
                ))}
            </div>

        </div>
    )
}

export default ArtWork