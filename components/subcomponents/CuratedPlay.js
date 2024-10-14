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
        <View className="flex-row w-full h-5/6 mx-1 mt-1 mb-3">
            {/* Currently Showing */}
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                // className="bg-black bg-opacity-50 w-3/12 p-4 rounded-lg">
                className=" p-4 rounded-lg flex-1 mr-5 -ml-5 h-[560]">
                <View className="  h-[540] flex-col">
                    <Text className={`text-2xl mb-2 text-center text-white ${fontsLoaded ? "font-gBold" : ""}`}>
                        Currently Showing
                    </Text>
                    <View className="p-4 rounded-lg h-2/3 max-h-60">
                        <Image
                            source={{ uri: `${constants.backendUrl}/curateThumbnail/${currentShow?.displayName}.png` }}
                            alt={currentShow?.displayName}
                            className="w-full h-[350] mb-4 rounded "
                        />
                        <View className="flex-row justify-between">
                            <Text className={`mb-2 text-white ${fontsLoaded ? "font-gBold" : ""}`}>{currentShow.displayName}</Text>
                            <Text className={`text-xs text-white ${fontsLoaded ? "font-gLight" : ""}`}>{minutes} : {seconds}</Text>
                        </View>
                    </View>
                    {/* <View className="flex-row justify-center">
                    <Button
                        title="End Show"
                        onPress={handleEndShow}
                        className="mt-4 px-6 py-2 border border-white rounded-full"
                    />
                </View> */}
                    < View className="absolute bottom-3 ml-5 mt-4 w-[90%]" >
                        <TouchableOpacity
                            className="border-white border-2 rounded-full px-4 py-2"
                            onPress={handleEndShow}
                        >
                            <Text className={`text-white text-center py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}
                            // style={{ fontFamily: 'Geometria' }}
                            >
                                End Show</Text>
                        </TouchableOpacity>
                    </View >
                </View>
            </View>
            {/* text-lg mb-0 text-center text-white ${fontsLoaded ? "font-gBold" : ""} */}
            {/* Choose a different show */}
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                className="rounded-lg w-8/12 p-4 h-[560] -mr-3">
                <Text className={`text-white text-2xl mb-0 ${fontsLoaded ? "font-gBold" : ""}`}>
                    Choose a different show
                </Text>
                {/* <ScrollView className="gap-x-5 gap-y-5 px-4 pb-4 mt-6 h-32 "
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        paddingHorizontal: 0,
                        item
                                         
                    }}
                > */}
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    // justifyContent: 'space-between',
                    paddingHorizontal: 0,
                    marginTop: 22,
                    height: 128,
                    gap: 10
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
                </View>
                {/* </ScrollView> */}
            </View>
        </View>
    );
}

export default CuratedPlay;