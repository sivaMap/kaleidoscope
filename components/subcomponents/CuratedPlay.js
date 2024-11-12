import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import CuratedShowCard from "./cards/CuratedShowCard";
import { constants } from "../../constants";
import { useKaleidoCrud } from "../../context/kaleidoscopeCrudContext";
import VolumeSlider2 from '../subcomponents/VolumeSlider2';
import ProgressBar from './ProgressBar ';

const CuratedPlay = ({ setLoadCurate, selectedShow, setSelectedShow, shows }) => {
    const [currentShow, setCurrentShow] = useState(selectedShow);
    const { toggleShowRun, fontsLoaded } = useKaleidoCrud();

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
        <View className="w-full h-5/6 mt-1 mb-3">
            {/* <Text className={`mb-2 text-white ${fontsLoaded ? "font-gBold" : ""}`}>{currentShow.displayName}</Text> */}
            {/* row1 */}
            <Text className={`text-white text-xl  ${fontsLoaded ? "font-gExtraBold" : ""}`}
            >
                {currentShow.displayName}
            </Text>

            {/* row2 */}
            <View className="flex-row ">
                {/* Currently Showing */}
                <View
                    // style={{
                    //     backgroundColor: 'rgba(0,0,0,0.5)',
                    // }}
                    // className="bg-black bg-opacity-50 w-3/12 p-4 rounded-lg">
                    // className="p-4 rounded-lg flex-1 mr-5 -ml-5 h-[560]">
                    className="rounded-lg flex-1 mr-5 -ml-5 h-[560] w-1/2">
                    <View className="  h-[540] flex-col">
                        <View className="p-4 rounded-lg h-2/3 max-h-60">
                            <Image
                                source={{ uri: `${constants.backendUrl}/curateThumbnail/${currentShow?.displayName}.png` }}
                                alt={currentShow?.displayName}
                                className="w-full h-[400] mb-4 rounded "
                            />
                            {/* <View className="flex-row justify-between">
                                <Text className={`mb-2 text-white ${fontsLoaded ? "font-gBold" : ""}`}>{currentShow.displayName}</Text>
                                <Text className={`text-xs text-white ${fontsLoaded ? "font-gBold" : ""}`}>{minutes} : {seconds}</Text>
                            </View> */}
                        </View>




                    </View>
                </View>

                {/* Choose a different show */}
                <View className="flex-col gap-y-4 h-[560] w-1/2">
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                        className="rounded-lg p-2"
                    >
                        <Text
                            className={` rounded-full text-lg text-white ${fontsLoaded ? "font-gBold" : ""}`}
                        >
                            Controls
                        </Text>
                        <VolumeSlider2 />
                        <View className="flex flex-row justify-between ">
                            <TouchableOpacity
                                onPress={() => setLoadName(constants.loadScreen.curate)}>
                                <View style={styles.borderContainer}>
                                    <Text
                                        style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)',
                                        }}
                                        className={` rounded-full px-8 py-3 text-center text-base text-white ${fontsLoaded ? "font-gBold" : ""}`}
                                    >
                                        Pause Show
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLoadName(constants.loadScreen.curate)}>
                                <View style={styles.borderContainer}>
                                    <Text
                                        style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)',
                                        }}
                                        className={` rounded-full px-8 py-3 text-center text-base text-white ${fontsLoaded ? "font-gBold" : ""}`}
                                    >
                                        End Show
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                        className="flex-col h-[235] p-2 rounded-lg"
                        // className="rounded-lg p-2"
                    // className="rounded-lg w-8/12 p-4 h-[560] -mr-3"
                    >
                        <Text
                            // style={{
                            //     backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)',
                            // }}
                            className={` rounded-full text-lg text-white ${fontsLoaded ? "font-gBold" : ""}`}
                        >
                            Artworks in the Current Show
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            // flexWrap: 'wrap',
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
                                    // <CuratedCard
                                    //     key={index}
                                    //     show={show}
                                    //     selectedShow={currentShow}
                                    //     handleShowClick={handleShowClick}
                                    // />
                                    <CuratedShowCard
                                        key={index}
                                        show={show}
                                        selectedShow={currentShow}
                                        handleShowClick={handleShowClick}
                                    />
                                    // <Text>one</Text>
                                )
                            })}
                        </View>
                    </View>

                </View>
            </View>

            {/* row3 */}
            {/* <View className="relative -bottom-72"> */}
            <View className="relative bottom-24">
                <ProgressBar status={{}} totalDuration={10} cumulativeDurations={[{}]} currentFileName={""} startTime={0} />
            </View>
        </View>

    );
}

export default CuratedPlay;

const styles = StyleSheet.create({
    borderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 2,
        borderRadius: 50,
    },
});