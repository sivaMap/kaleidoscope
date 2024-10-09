import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import CuratedCard from "./cards/CuratedCard";
import { constants } from "../../constants";
import { useKaleidoCrud } from "../../context/kaleidoscopeCrudContext";

const CuratedPlay = ({ setLoadCurate, selectedShow, setSelectedShow, shows }) => {
    const [currentShow, setCurrentShow] = useState(selectedShow);
    const { toggleShowRun } = useKaleidoCrud();
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
        <View className="flex-row gap-3 h-32">
            {/* Currently Showing */}
            <View className="bg-black bg-opacity-50 w-3/12 p-4 rounded-lg">
                <Text className="text-lg font-bold mb-4 text-center">Currently Showing</Text>
                <View className="bg-black p-4 rounded-lg h-2/3 max-h-60">
                    <Image
                        source={{ uri: `${constants.backendUrl}/curateThumbnail/${currentShow?.displayName}.png` }}
                        alt={currentShow.displayName}
                        className="mb-4 rounded w-full"
                    />
                    <View className="flex-row justify-between">
                        <Text className="font-semibold text-base mb-2">{currentShow.displayName}</Text>
                        <Text className="text-sm text-gray-400">{minutes} : {seconds}</Text>
                    </View>
                </View>
                <View className="flex-row justify-center">
                    <Button
                        title="End Show"
                        onPress={handleEndShow}
                        className="mt-4 px-6 py-2 border border-white rounded-full"
                    />
                </View>
            </View>

            {/* Choose a different show */}
            <View className="bg-black bg-opacity-50 w-9/12 p-4">
                <Text className="text-lg font-bold mb-4">Choose a different show</Text>
                <View className="grid grid-cols-2 gap-4">
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
            </View>
        </View>
    );
}

export default CuratedPlay;