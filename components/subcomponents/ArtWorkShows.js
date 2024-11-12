import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import ArtShowCard from './cards/ArtShowCard';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';
import { getBasename, getFilenameWithoutExtension } from '../../userFunctions';
import ProgressBar from './ProgressBar ';

const ArtWorkShows = ({ selectedArtificats, setSelectedArtifacts, setLoadArt }) => {
    const { toggleShowRun, fontsLoaded, setLoadName } = useKaleidoCrud();
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
        <View className='relative gap-3 h-5/6 mt-0 mb-4'>
            <View className={`flex-row justify-between px-1 py-1`}>
                <Text className={`text-xl text-white ${fontsLoaded ? "font-gBold" : ""}`}>
                    Artworks in the Current Show
                </Text>
                < View
                    className="flex-row gap-5"
                >
                    <TouchableOpacity
                        className="border-white border-2 rounded-full px-3 py-2"
                        onPress={handleEndShow}
                    >
                        <Text className={`text-white px-3 py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}>
                            End Show</Text>
                    </TouchableOpacity>
                </View >
            </View>


            {/* <ScrollView className=" gap-x-5 -ml-2 mt-4 h-[calc(17rem)] overflow-auto"
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingHorizontal: 4,
                }}> */}
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingHorizontal: 0,
                marginTop: 22,
                height: 128,
                gap: 10
            }}
            >
                {selectedArtificats?.map((artifact, index) => (
                    <ArtShowCard key={index} artifact={artifact} currentFileName={currentFileName} />
                ))}
            </View>
            {/* </ScrollView> */}
            {/* <ScrollView className="grid grid-cols-5 gap-x-5 -ml-2 mt-4 h-[calc(17rem)] overflow-auto">
                {selectedArtificats?.map((artifact, index) => (
                    <ArtShowCard key={index} artifact={artifact} />
                ))}
            </ScrollView> */}

            {/* <View className="flex-row justify-end mt-4"> */}
            {/* <View className="absolute -bottom-16 right-0  mt-4 rounded-full">
                <Button
                    title="End Show"
                    onPress={handleEndShow}
                    className="px-6 py-2 border border-white rounded-full"
                />
            </View> */}

            {/* < View className="absolute -bottom-24 right-4  mt-4 " >
                <TouchableOpacity
                    className="border-white border-2 rounded-full px-3 py-2"
                    onPress={handleEndShow}
                >
                    <Text className={`text-white px-3 py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}>
                        End Show</Text>
                </TouchableOpacity>
            </View > */}
            {
                <View className="relative -bottom-72">
                    <ProgressBar status={status} totalDuration={totalDuration} cumulativeDurations={cumulativeDurations} currentFileName={currentFileName} startTime={startTimeRef.current} />
                </View>
            }
        </View>
    );
};

export default ArtWorkShows;