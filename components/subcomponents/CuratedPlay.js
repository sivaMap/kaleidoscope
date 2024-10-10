import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import CuratedCard from "./cards/CuratedCard";
import { constants } from "../../constants";
import { useKaleidoCrud } from "../../context/kaleidoscopeCrudContext";

const CuratedPlay = ({ setLoadCurate, selectedShow, setSelectedShow, shows }) => {
    const [currentShow, setCurrentShow] = useState(selectedShow);
    const { toggleShowRun, fontsLoaded } = useKaleidoCrud();
    const minutes = Math.floor(currentShow?.duration / 60);
    const seconds = Math.floor(currentShow?.duration % 60);

    const handleShowClick = ({ showName }) => {
        if (showName.displayName === currentShow.displayName) {
            return;
        }
        setSelectedShow(showName);
        setCurrentShow(showName);
    };

    const handleEndShow = () => {
        fetch(`${constants.backendUrl}/curate/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "control": "stop"
            }),
        })
            .catch(error => console.error('Error fetching apps:', error));
        setLoadCurate(constants.loadCurate.show);
        setSelectedShow({});
        toggleShowRun();
    };

    useEffect(() => {
        fetch(`${constants.backendUrl}/curate/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: currentShow?.filename,
            }),
        })
            .catch(error => console.error('Error fetching apps:', error));
    }, [currentShow]);

    return (
        <View className="flex-row gap-3 mt-2 mr-3 h-5/6">
            {/* Currently Showing */}
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                // className="bg-black bg-opacity-50 w-3/12 p-4 rounded-lg">
                className="w-3/12 p-4 rounded-lg h-[460] flex-col">
                <Text className="text-lg font-bold mb-4 text-center text-white"
                    style={{ fontFamily: fontsLoaded ? 'Geometria' : '' }}
                >Currently Showing</Text>
                <View className=" p-4 rounded-lg h-2/3 max-h-60">
                    <Image
                        source={{ uri: `${constants.backendUrl}/curateThumbnail/${currentShow?.displayName}.png` }}
                        alt={currentShow?.displayName}
                        className="w-full h-64 mb-4 rounded "
                    />
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-base mb-2 text-white">{currentShow.displayName}</Text>
                        <Text className="text-sm text-white">{minutes} : {seconds}</Text>
                    </View>
                </View>
                {/* <View className="flex-row justify-center">
                    <Button
                        title="End Show"
                        onPress={handleEndShow}
                        className="mt-4 px-6 py-2 border border-white rounded-full"
                    />
                </View> */}
                < View className="absolute bottom-3 left-[40%]  mt-4 " >
                    <TouchableOpacity
                        className="border-white border-2 rounded-full px-4 py-2"
                        onPress={handleEndShow}
                    >
                        <Text className="text-white font-bold text-xl"
                            style={{ fontFamily: 'Geometria' }}
                        >
                            End Show</Text>
                    </TouchableOpacity>
                </View >
            </View>

            {/* Choose a different show */}
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                className="w-9/12 p-4 h-[460]">
                <Text className="text-white text-lg font-bold mb-4"
                    style={{ fontFamily: 'Geometria', fontFamily: fontsLoaded ? 'Geometria' : '' }}
                >Choose a different show</Text>
                <ScrollView className="gap-x-5 gap-y-5 px-4 pb-4 mt-6 h-32 "
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',

                        paddingHorizontal: 4,
                    }}
                >
                    {shows.map((show, index) => {
                        if (show.displayName === currentShow.displayName) return null;
                        return (
                            <CuratedCard
                                key={index}
                                show={show}
                                selectedShow={currentShow}
                                handleShowClick={handleShowClick}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

export default CuratedPlay;