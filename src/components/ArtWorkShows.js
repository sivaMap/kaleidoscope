import React, { useState } from 'react'
import ArtShowCard from './cards/ArtShowCard';
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';

const ArtWorkShows = ({ pSelectedArtificats }) => {    

    //only five artifacts can be selected
    const [selectedArtificats, setSelectedArtifacts] = useState(pSelectedArtificats ?? []);
    const { navigateHomeScreen } = useKaleidoCrud();

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
                {selectedArtificats.map((artifact) => (
                    <ArtShowCard key={artifact.id} artifact={artifact}
                        selectedArtificats={selectedArtificats}
                        handleArtifactSelect={handleArtifactSelect}
                        handleArtificateUndoSelect={handleArtificateUndoSelect}
                    />
                ))}
            </div>

            <div className="flex justify-end" onClick={navigateHomeScreen}>
                <button className="px-6 py-2 border border-white rounded-full" onClick={navigateHomeScreen}>
                    End Show
                </button>
            </div>

        </div>
    )
}

export default ArtWorkShows