import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import CuratedCard from './cards/CuratedCard';
// import CuratedPlay from './CuratedPlay';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';
import { SvgXml } from 'react-native-svg'; // For the SVG
import CuratedPlay from './CuratedPlay';
import { useFonts } from 'expo-font';

const CuratedShows = () => {
    const [selectedShow, setSelectedShow] = useState({});
    const [shows, setShows] = useState([]);
    const [loadCurate, setLoadCurate] = useState(constants.loadCurate.show);
    const { navigateHomeScreen, toggleShowRun,fontsLoaded  } = useKaleidoCrud();
    

    // Fetch all the shows from server1
    useEffect(() => {
        fetch(`${constants.backendUrl}/curate/videos`)
            .then(response => response.json())
            .then(data => setShows([...data])
            )
            .catch(error => console.error('Error fetching apps:', error));
    }, []);

    const handleShowClick = ({ showName }) => {
        if (showName === selectedShow) {
            setSelectedShow({});
            return;
        }
        setSelectedShow(showName);
    };

    // Either one of Three bodies or cases will be loaded based on loadName state
    const loadCurateScene = () => {
        let view = [];
        switch (loadCurate) {
            case constants.loadCurate.show:
                view.push(
                    <View className="relative flex flex-col  h-5/6 " key={"CurateShowDefault"}>
                        {/* Header Section */}
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity className="bg-black py-2 px-3 rounded-full" onPress={navigateHomeScreen}>
                                {/* SVG Back Arrow */}
                                <SvgXml
                                    xml={`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 15 24" fill="none">
                                  <path d="M12.1337 23.4235L0.382256 11.8353L12.1337 0.24707L14.2196 2.30398L4.55402 11.8353L14.2196 21.3666L12.1337 23.4235Z" fill="white" />
                                </svg>`} />
                            </TouchableOpacity>

                            <Text className=" text-white  "
                                style={{ fontFamily: fontsLoaded ? 'Geometria' : '', "fontWeight": 700,"fontSize":20 }}
                            >
                                Curated Shows
                            </Text>
                        </View>

                        {/* Shows List */}
                        {/* <ScrollView className="gap-x-5 gap-y-5 px-4  mt-6 h-32 "
                            contentContainerStyle={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between', // Ensures space between items                                
                                paddingHorizontal: 4, // Optional: add horizontal padding if needed
                                // gap: -5
                            }}
                        > */}
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            paddingHorizontal: 7,
                            marginTop: 24,
                            height: 128,
                            gap: 20
                        }}
                        >
                            {shows.map((show, index) => (
                                <CuratedCard key={index} show={show} selectedShow={selectedShow} handleShowClick={handleShowClick}

                                />
                            ))}
                            {/* </ScrollView> */}
                        </View>
                        {/* Start Show Button */}
                        < View className="absolute -bottom-16 right-0  mt-4 " >
                            <TouchableOpacity
                                className="border-white border-2 rounded-full px-4 py-2"
                                onPress={() => {
                                    if (Object.keys(selectedShow)?.length === 0) return;
                                    setLoadCurate(constants.loadCurate.play);
                                    toggleShowRun();
                                }}
                            >
                                <Text className="text-white font-bold px-3 py-1 text-xl"
                                    style={{ fontFamily: 'Geometria', fontFamily: fontsLoaded ? 'Geometria' : '' }}
                                >
                                    Start Show</Text>
                            </TouchableOpacity>
                        </View >
                    </View >
                );
                break;
            case constants.loadCurate.play:
                view.push(
                    <CuratedPlay key={"CuratePlay"}
                        setLoadCurate={setLoadCurate}
                        selectedShow={selectedShow} setSelectedShow={setSelectedShow}
                        shows={shows}
                    />
                );
                break;
            default: break;
        }
        return view;
    };

    return (
        <View className="flex-grow px-5">
            {loadCurateScene()}
        </View>
    );
};

export default CuratedShows;