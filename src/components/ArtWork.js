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
        <div className='bg-black bg-opacity-30 w-[calc(42rem)] text-white p-4 rounded-lg max-h-80 overflow-hidden'>
            <h2 className="text-lg font-bold mb-4"
                style={{ fontFamily: 'Geometria' }}>
                Artworks(Select any 5)
            </h2>

            <div className="grid grid-cols-4 gap-x-5 -ml-2 px-4 pb-4 h-[calc(17rem)] custom-scroll overflow-auto">
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