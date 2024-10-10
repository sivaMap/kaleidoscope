import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import ArtShowCard from './cards/ArtShowCard';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';

const ArtWorkShows = ({ selectedArtificats, setSelectedArtifacts, setLoadArt }) => {
    const { toggleShowRun } = useKaleidoCrud();

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

    return (
        <View className='relative gap-3 h-5/6'>
            <Text className='text-2xl text-white'>
                Artworks in the Current Show
            </Text>

            <ScrollView className=" gap-x-5 -ml-2 mt-4 h-[calc(17rem)] overflow-auto"
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingHorizontal: 4,
                }}>
                {selectedArtificats?.map((artifact, index) => (
                    <ArtShowCard key={index} artifact={artifact} />
                ))}
            </ScrollView>
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

            < View className="absolute -bottom-16 right-0  mt-4 " >
                <TouchableOpacity
                    className="border-white border-2 rounded-full px-4 py-2"
                    onPress={handleEndShow}
                >
                    <Text className="text-white"
                    // style={{ fontFamily: 'Geometria' }}
                    >
                        End Show</Text>
                </TouchableOpacity>
            </View >
        </View>
    );
};

export default ArtWorkShows;