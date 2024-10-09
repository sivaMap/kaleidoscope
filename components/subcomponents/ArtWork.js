import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
// import ArtworkCard from './cards/ArtworkCard';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';
import Svg, { Path } from 'react-native-svg';
import ArtworkCard from './cards/ArtworkCard';
import ArtWorkShows from './ArtWorkShows';
// import ArtWorkShows from './ArtWorkShows';

const ArtWork = () => {
    const [artifacts, setArtifcats] = useState([]);
    const [selectedArtificats, setSelectedArtifacts] = useState([]);
    const [loadArt, setLoadArt] = useState(constants.loadArt.show);
    const { navigateHomeScreen, toggleShowRun } = useKaleidoCrud();

    const handleArtifactSelect = ({ artifact }) => {
        if (selectedArtificats.length < 5) {
            setSelectedArtifacts(prev => [...prev, artifact]);
        }
    };

    const handleArtificateUndoSelect = ({ artifact }) => {
        const filteredArtifacts = selectedArtificats.filter(selectedArtificat => selectedArtificat?.displayName !== artifact?.displayName);
        setSelectedArtifacts([...filteredArtifacts]);
    };

    useEffect(() => {
        fetch(`${constants.backendUrl}/art`)
            .then(response => response.json())
            .then(data => setArtifcats([...data]))
            .catch(error => console.error('Error fetching apps:', error));
    }, []);

    const loadArtScene = () => {
        let view = [];
        switch (loadArt) {
            case constants.loadArt.show:
                view.push(
                    <View className="relative" key={"ArtDefault"}>
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center space-x-4">
                                <TouchableOpacity
                                    className="bg-black py-2 px-3 rounded-full"
                                    onPress={navigateHomeScreen}
                                >
                                    <Text>
                                        {/* Icon SVG can be replaced with an actual image or another method */}
                                        <Svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 15 24" fill="none">
                                            <Path d="M12.1337 23.4235L0.382256 11.8353L12.1337 0.24707L14.2196 2.30398L4.55402 11.8353L14.2196 21.3666L12.1337 23.4235Z" fill="white" />
                                        </Svg>
                                    </Text>
                                </TouchableOpacity>

                                <Text className="text-2xl" 
                                // style={{ fontFamily: 'Geometria' }}
                                >
                                    Select any 5 artworks
                                </Text>
                            </View>
                            <TouchableOpacity
                                className="border-white border-2 rounded-full px-4 py-2"
                                onPress={() => {
                                    if (selectedArtificats.length < 1) return;
                                    setLoadArt(constants.loadArt.play);
                                    toggleShowRun();
                                }}
                            >
                                <Text className="mt-2">Start Show</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="grid grid-cols-4 gap-x-5 -ml-2 mt-4 px-4 pb-4 h-[calc(19rem)] custom-scroll overflow-auto">
                            {artifacts.map((artifact, index) => (
                                <ArtworkCard
                                    key={index}
                                    artifact={artifact}
                                    selectedArtificats={selectedArtificats}
                                    handleArtifactSelect={handleArtifactSelect}
                                    handleArtificateUndoSelect={handleArtificateUndoSelect}
                                />
                            ))}
                        </ScrollView>
                    </View>
                );
                break;
            case constants.loadArt.play:
                view.push(
                    <ArtWorkShows
                        key={"CuratePlay"}
                        selectedArtificats={selectedArtificats}
                        setSelectedArtifacts={setSelectedArtifacts}
                        setLoadArt={setLoadArt}
                    />
                );
                break;
            default:
                break;
        }
        return view;
    };

    return loadArtScene();
};

export default ArtWork;