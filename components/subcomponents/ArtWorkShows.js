import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
        <View className='relative'>
            <Text className='text-2xl font-[Geometria]'>
                Artworks in the Current Show
            </Text>

            <ScrollView className="grid grid-cols-5 gap-x-5 -ml-2 mt-4 h-[calc(17rem)] overflow-auto">
                {selectedArtificats?.map((artifact, index) => (
                    <ArtShowCard key={index} artifact={artifact} />
                ))}
            </ScrollView>

            <View className="flex justify-end mt-4">
                <TouchableOpacity className="px-6 py-2 border border-white rounded-full" onPress={handleEndShow}>
                    <Text className="text-white">End Show</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ArtWorkShows;