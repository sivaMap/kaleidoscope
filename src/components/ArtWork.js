import React, { useState } from 'react'
import ArtworkCard from './cards/ArtworkCard';
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';
import { constants } from '../constants';
import ArtWorkShows from './ArtWorkShows';

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
    const [loadArt, setLoadArt] = useState(constants.loadArt.show);
    const { navigateHomeScreen, toggleShowRun } = useKaleidoCrud();
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

    // Either one of Three bodies or cases will be loaded based on loadName state
    const loadArtScene = () => {
        let view = [];
        switch (loadArt) {
            case constants.loadArt.show: view.push(
                <div className='relative ' key={"ArtDefault"}>
                    <div className='flex justify-between'>
                        <div className='flex gap-4  items-center'>
                            <button className='bg-black py-2 px-3 rounded-full'
                                onClick={navigateHomeScreen}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 15 24" fill="none">
                                    <path d="M12.1337 23.4235L0.382256 11.8353L12.1337 0.24707L14.2196 2.30398L4.55402 11.8353L14.2196 21.3666L12.1337 23.4235Z" fill="white" />
                                </svg>
                            </button>

                            <h2 className="text-2xl"
                                style={{ fontFamily: 'Geometria' }}>
                                Select any 5 artworks
                            </h2>
                        </div>
                        <div className='flex justify-end'
                            style={{ fontFamily: 'Geometria' }}
                            onClick={() => {
                                if (selectedArtificats.length < 1) return;
                                setLoadArt(constants.loadArt.play);
                                toggleShowRun();
                            }}>
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
                break;
            case constants.loadArt.play: view.push(
                <ArtWorkShows key={"CuratePlay"} pSelectedArtificats={selectedArtificats} />
            )
                break;
            default: break
        }
        return view;
    }

    return (
        loadArtScene()
    )
}

export default ArtWork