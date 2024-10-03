import React, { useState } from 'react'
import ArtworkCard from './cards/ArtworkCard';
import ArtShowCard from './cards/ArtShowCard';

const ArtWorkShows = () => {
    const artifacts = [
        { id: 1, name: 'Artifact 1' },
        { id: 2, name: 'Artifact 2' },
        { id: 3, name: 'Artifact 3' },
        { id: 4, name: 'Artifact 4' },
        { id: 5, name: 'Artifact 5' },
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

            <h2 className="text-2xl "
                style={{ fontFamily: 'Geometria' }}>
                Artworks in the Current Show
            </h2>

            <div className="grid grid-cols-5 gap-x-5 -ml-2 mt-4 px-4 h-[calc(17rem)] custom-scroll overflow-auto">
                {artifacts.map((artifact) => (
                    <ArtShowCard key={artifact.id} artifact={artifact}
                        selectedArtificats={selectedArtificats}
                        handleArtifactSelect={handleArtifactSelect}
                        handleArtificateUndoSelect={handleArtificateUndoSelect}
                    />
                ))}
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-2 border border-white rounded-full">
                    End Show
                </button>
            </div>

        </div>
    )
}

export default ArtWorkShows