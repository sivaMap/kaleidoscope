import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';
import { SvgXml } from 'react-native-svg';
import ArtworkCard from './cards/ArtworkCard';
import ArtWorkShows from './ArtWorkShows';

const ArtWork = () => {
    const [artifacts, setArtifcats] = useState([]);
    const [selectedArtificats, setSelectedArtifacts] = useState([]);
    const [loadArt, setLoadArt] = useState(constants.loadArt.show);
    const { navigateHomeScreen, toggleShowRun, fontsLoaded } = useKaleidoCrud();
    const isArtShowSected = selectedArtificats.length === 5;
    const scrollViewRef = useRef('');


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
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const loadArtScene = () => {
        let view = [];
        switch (loadArt) {
            case constants.loadArt.show:
                view.push(
                    <View className="relative h-[548] mb-4 " key={"ArtDefault"}>
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center space-x-4">
                                <TouchableOpacity className="bg-black py-2 px-3 rounded-full" onPress={navigateHomeScreen}>
                                    {/* SVG Back Arrow */}
                                    <SvgXml
                                        xml={`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 15 24" fill="none">
                                  <path d="M12.1337 23.4235L0.382256 11.8353L12.1337 0.24707L14.2196 2.30398L4.55402 11.8353L14.2196 21.3666L12.1337 23.4235Z" fill="white" />
                                </svg>`} />
                                </TouchableOpacity>

                                <Text className={`text-xl text-white ${fontsLoaded ? "font-gBold" : ""}`}>
                                    Select any 5 artworks
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!isArtShowSected) return;
                                    setLoadArt(constants.loadArt.play);
                                    toggleShowRun();
                                }}
                            >
                                <View
                                    style={styles.borderContainer}
                                    className={`border-white border-2 rounded-full px-4 py-2 ${!isArtShowSected ? "opacity-30" : ""}`}
                                >
                                    <Text className={` text-white px-3 py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}>Start Show</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <SafeAreaView style={styles.container}>
                            <ScrollView className=" -ml-2  px-4 h-full "
                                style={styles.scrollView}
                                contentContainerStyle={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    paddingHorizontal: 4,
                                    gap: 20
                                }}>
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
                        </SafeAreaView>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    borderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
    },
});