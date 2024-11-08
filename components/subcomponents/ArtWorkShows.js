import React, { useEffect, useState } from 'react';
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

    const navigateHomeScreen = () => {
        fetch(`${constants.backendUrl}/art/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "control": "stop"
            }),
        })
            .catch(error => console.error('Error stoping Show:', error));
        setLoadName(constants.loadScreen.default);
        setSelectedArtifacts([]);
        toggleShowRun();
    }

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

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.68.128:8082');

        ws.onmessage = (event) => {
            // console.log(event.data)
            let data;
            try {
                data = JSON.parse(event.data);
            } catch (error) { }
            if (data) {
                const tfilename = data?.CurrentMediaFile;
                const baseName = getFilenameWithoutExtension(tfilename);
                setCurrentFileName(baseName);
                setStatus(data);
            }
        };
        ws.onclose = () => {
            console.log('WebSocket connection closed');
            handleEndShow();
        };

        return () => {
            ws.close();
        };
    }, []);

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
                        <Text className={`text-white px-5 py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}>
                            Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="border-white border-2 rounded-full px-3 py-2"
                        onPress={navigateHomeScreen}
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
                gap: 20
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
                    <ProgressBar status={status} />
                </View>
            }
        </View>
    );
};

export default ArtWorkShows;