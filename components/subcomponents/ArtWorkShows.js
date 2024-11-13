import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';
import ArtShowCard from './cards/ArtShowCard';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';
import { getBasename, getFilenameWithoutExtension } from '../../userFunctions';
import ProgressBar from './ProgressBar ';
import VolumeSlider2 from './volumeSlider3';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

const ArtWorkShows = ({ selectedArtificats, setSelectedArtifacts, setLoadArt }) => {
    const { toggleShowRun, fontsLoaded, setLoadName } = useKaleidoCrud();
    const [play, setPlay] = useState(false);
    const [currentFileName, setCurrentFileName] = useState('');
    const [status, setStatus] = useState(null);
    const startTimeRef = useRef(0);
    const totalDuration = selectedArtificats.reduce((sum, video) => sum + video.duration, 0);
    let cumulativeTime = 0;
    const cumulativeDurations = selectedArtificats.map(video => {
        const result = { displayName: video.displayName, start_time: cumulativeTime };
        cumulativeTime += video.duration;
        return result;
    });
    function getStartTime(cumulativeDurations, displayName) {
        const video = cumulativeDurations.find(video => video.displayName === displayName);
        console.log(video)
        return video ? video.start_time : -1; // Return -1 if displayName not found
    }
    const interTime = getStartTime(cumulativeDurations, currentFileName) + status?.PlaybackTime
    // const startTime= startTime>interTime? startTime:interTime;
    if (interTime > startTimeRef.current) {
        startTimeRef.current = interTime;
    }

    const handleEndShow = () => {
        fetch(`${constants.backendUrl}/art/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "control": "stop",
            }),
        })
            .catch(error => console.error('Error fetching apps:', error));
        setSelectedArtifacts([]);
        setLoadArt(constants.loadArt.show);
        toggleShowRun();
    };

    const handlePlay = (action) => {
        fetch(`${constants.backendUrl}/art/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                control: action === "play" ? "play" : "pause",
            }),
        }).catch(error => console.error('Error play:', error));
    };

    useEffect(() => {
        fetch(`${constants.backendUrl}/art/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedArtificats: selectedArtificats,
            }),
        })
            .catch(error => console.error('Error fetching apps:', error));
        // eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     const ws = new WebSocket(`ws://${constants.ipAddress}:8082`);

    //     ws.onmessage = (event) => {
    //         // console.log(event.data)
    //         let data;
    //         try {
    //             data = JSON.parse(event.data);
    //         } catch (error) { }
    //         if (data) {
    //             const tfilename = data?.CurrentMediaFile;
    //             const baseName = getFilenameWithoutExtension(tfilename);
    //             setCurrentFileName(baseName);
    //             setStatus(data);
    //         }
    //     };
    //     ws.onclose = () => {
    //         console.log('WebSocket connection closed');
    //         // handleEndShow();
    //     };

    //     return () => {
    //         ws.close();
    //     };
    // }, []);

    return (
        <View className=' gap-3 h-5/6 mt-0 mb-4'>
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
                className="flex-grow rounded-lg"
            >
                {/* <View className={`flex-row justify-between  py-1`}> */}
                <Text className={`text-xl mx-2 my-2 text-white ${fontsLoaded ? "font-gBold" : ""}`}>
                    Artworks in the Current Show
                </Text>
                {/* < View
                        className="flex-row gap-5"
                    >
                        <TouchableOpacity
                            className="border-white border-2 rounded-full px-3 py-2"
                            onPress={handleEndShow}
                        >
                            <Text className={`text-white px-3 py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}>
                                End Show</Text>
                        </TouchableOpacity>
                    </View > */}
                {/* </View> */}


                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                    // marginTop: 22,
                    // height: 128,
                    // rowGap: 10
                }}
                >
                    {selectedArtificats?.map((artifact, index) => (
                        <ArtShowCard key={index} artifact={artifact} currentFileName={currentFileName} />
                    ))}
                </View>
            </View>

            {/* <View className="pt-32"> */}
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                className="rounded-lg p-2 flex-col space-y-5 "
            >
                <Text
                    className={` rounded-full text-lg text-white ${fontsLoaded ? "font-gBold" : ""}`}
                >
                    Controls
                </Text>
                <View className="flex flex-row justify-between px-2 ">

                    <TouchableOpacity
                        onPress={() => {
                            setPlay((prev) => !prev);
                            handlePlay();
                        }}>
                        <View style={styles.borderContainer} className="flex-row ">
                            {play ? <Svg className="mt-3 ml-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 56 56" fill="none">
                                <Mask id="mask0_1680_2162" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
                                    <Rect width="56" height="56" fill="#D9D9D9" />
                                </Mask>
                                <G mask="url(#mask0_1680_2162)">
                                    <Path d="M21.0003 37.3333H25.667V18.6667H21.0003V37.3333ZM30.3337 37.3333H35.0003V18.6667H30.3337V37.3333ZM28.0003 51.3333C24.7725 51.3333 21.7392 50.7208 18.9003 49.4958C16.0614 48.2708 13.592 46.6083 11.492 44.5083C9.39199 42.4083 7.72949 39.9389 6.50449 37.1C5.27949 34.2611 4.66699 31.2278 4.66699 28C4.66699 24.7722 5.27949 21.7389 6.50449 18.9C7.72949 16.0611 9.39199 13.5917 11.492 11.4917C13.592 9.39166 16.0614 7.72916 18.9003 6.50416C21.7392 5.27916 24.7725 4.66666 28.0003 4.66666C31.2281 4.66666 34.2614 5.27916 37.1003 6.50416C39.9392 7.72916 42.4087 9.39166 44.5087 11.4917C46.6087 13.5917 48.2712 16.0611 49.4962 18.9C50.7212 21.7389 51.3337 24.7722 51.3337 28C51.3337 31.2278 50.7212 34.2611 49.4962 37.1C48.2712 39.9389 46.6087 42.4083 44.5087 44.5083C42.4087 46.6083 39.9392 48.2708 37.1003 49.4958C34.2614 50.7208 31.2281 51.3333 28.0003 51.3333ZM28.0003 46.6667C33.2114 46.6667 37.6253 44.8583 41.242 41.2417C44.8587 37.625 46.667 33.2111 46.667 28C46.667 22.7889 44.8587 18.375 41.242 14.7583C37.6253 11.1417 33.2114 9.33332 28.0003 9.33332C22.7892 9.33332 18.3753 11.1417 14.7587 14.7583C11.142 18.375 9.33366 22.7889 9.33366 28C9.33366 33.2111 11.142 37.625 14.7587 41.2417C18.3753 44.8583 22.7892 46.6667 28.0003 46.6667Z" fill="white" />
                                </G>
                            </Svg> : <Svg className="mt-3 ml-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 56 56" fill="none">
                                <Mask id="mask0_1680_2134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
                                    <Rect width="56" height="56" fill="#D9D9D9" />
                                </Mask>
                                <G mask="url(#mask0_1680_2134)">
                                    <Path d="M22.167 38.5L38.5003 28L22.167 17.5V38.5ZM28.0003 51.3333C24.7725 51.3333 21.7392 50.7208 18.9003 49.4958C16.0614 48.2708 13.592 46.6083 11.492 44.5083C9.39199 42.4083 7.72949 39.9389 6.50449 37.1C5.27949 34.2611 4.66699 31.2278 4.66699 28C4.66699 24.7722 5.27949 21.7389 6.50449 18.9C7.72949 16.0611 9.39199 13.5917 11.492 11.4917C13.592 9.39167 16.0614 7.72917 18.9003 6.50417C21.7392 5.27917 24.7725 4.66667 28.0003 4.66667C31.2281 4.66667 34.2614 5.27917 37.1003 6.50417C39.9392 7.72917 42.4087 9.39167 44.5087 11.4917C46.6087 13.5917 48.2712 16.0611 49.4962 18.9C50.7212 21.7389 51.3337 24.7722 51.3337 28C51.3337 31.2278 50.7212 34.2611 49.4962 37.1C48.2712 39.9389 46.6087 42.4083 44.5087 44.5083C42.4087 46.6083 39.9392 48.2708 37.1003 49.4958C34.2614 50.7208 31.2281 51.3333 28.0003 51.3333ZM28.0003 46.6667C33.2114 46.6667 37.6253 44.8583 41.242 41.2417C44.8587 37.625 46.667 33.2111 46.667 28C46.667 22.7889 44.8587 18.375 41.242 14.7583C37.6253 11.1417 33.2114 9.33334 28.0003 9.33334C22.7892 9.33334 18.3753 11.1417 14.7587 14.7583C11.142 18.375 9.33366 22.7889 9.33366 28C9.33366 33.2111 11.142 37.625 14.7587 41.2417C18.3753 44.8583 22.7892 46.6667 28.0003 46.6667Z" fill="white" />
                                </G>
                            </Svg>}


                            <Text
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)',

                                }}
                                className={` rounded-full ml-2 pr-6 py-3 text-center text-base w-[140px] text-white ${fontsLoaded ? "font-gBold" : ""}`}

                            >
                                {/* Pause Show */}
                                Play Show
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <VolumeSlider2 />

                    <TouchableOpacity
                        onPress={handleEndShow}>
                        <View style={styles.borderContainer} className="flex-row">
                            <Svg className="mt-3 ml-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 44 44" fill="none">
                                <Mask id="mask0_1660_25993" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
                                    <Rect width="44" height="44" fill="#D9D9D9" />
                                </Mask>
                                <G mask="url(#mask0_1660_25993)">
                                    <Path d="M15.4003 31.1667L22.0003 24.5667L28.6003 31.1667L31.167 28.6L24.567 22L31.167 15.4L28.6003 12.8333L22.0003 19.4333L15.4003 12.8333L12.8337 15.4L19.4337 22L12.8337 28.6L15.4003 31.1667ZM22.0003 40.3333C19.4642 40.3333 17.0809 39.8521 14.8503 38.8896C12.6198 37.9271 10.6795 36.6208 9.02949 34.9708C7.37949 33.3208 6.07324 31.3805 5.11074 29.15C4.14824 26.9194 3.66699 24.5361 3.66699 22C3.66699 19.4639 4.14824 17.0805 5.11074 14.85C6.07324 12.6194 7.37949 10.6792 9.02949 9.02916C10.6795 7.37916 12.6198 6.07291 14.8503 5.11041C17.0809 4.14791 19.4642 3.66666 22.0003 3.66666C24.5364 3.66666 26.9198 4.14791 29.1503 5.11041C31.3809 6.07291 33.3212 7.37916 34.9712 9.02916C36.6212 10.6792 37.9274 12.6194 38.8899 14.85C39.8524 17.0805 40.3337 19.4639 40.3337 22C40.3337 24.5361 39.8524 26.9194 38.8899 29.15C37.9274 31.3805 36.6212 33.3208 34.9712 34.9708C33.3212 36.6208 31.3809 37.9271 29.1503 38.8896C26.9198 39.8521 24.5364 40.3333 22.0003 40.3333ZM22.0003 36.6667C26.0948 36.6667 29.5628 35.2458 32.4045 32.4042C35.2462 29.5625 36.667 26.0944 36.667 22C36.667 17.9055 35.2462 14.4375 32.4045 11.5958C29.5628 8.75416 26.0948 7.33332 22.0003 7.33332C17.9059 7.33332 14.4378 8.75416 11.5962 11.5958C8.75449 14.4375 7.33366 17.9055 7.33366 22C7.33366 26.0944 8.75449 29.5625 11.5962 32.4042C14.4378 35.2458 17.9059 36.6667 22.0003 36.6667Z" fill="white" />
                                </G>
                            </Svg>
                            <Text
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)',
                                }}
                                className={` rounded-full ml-2 pr-6 py-3 text-center text-base text-white ${fontsLoaded ? "font-gBold" : ""}`}
                            >
                                End Show
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <ProgressBar status={status} totalDuration={totalDuration} cumulativeDurations={cumulativeDurations} currentFileName={currentFileName} startTime={startTimeRef.current} />
                </View>

            </View>
            {/* </View> */}


            {/* {
                <View className="relative -bottom-72">
                </View>
            } */}
        </View>
    );
};

export default ArtWorkShows;

const styles = StyleSheet.create({
    borderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
        borderRadius: 50
    },
});