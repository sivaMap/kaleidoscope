import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { constants } from '../../../constants';
import { useKaleidoCrud } from '../../../context/kaleidoscopeCrudContext';

const ArtShowCard = memo(function ArtShowCard(props) {
    const { artifact, currentFileName } = props;
    const { fontsLoaded } = useKaleidoCrud();
    // const isSelected = selectedShow?.displayName === show?.displayName;
    const isSelected = artifact?.displayName === currentFileName;    

    return (
        <View className={`rounded-lg shadow-md p-2 mb-2 w-56 ${isSelected ? "border-white border-2" : "border-transparent border-2"}`}>
            <View className="h-56 rounded-lg mb-0">
                <Image
                    source={{ uri: `${constants.backendUrl}/artThumbnail/${artifact?.displayName}.png?timestamp=${new Date().getMinutes()}` }}
                    alt={artifact?.displayName}
                    className="w-full h-full rounded-lg object-cover"
                />
            </View>
            <Text className={`text-center text-white mt-2 ${fontsLoaded ? "font-gBold" : ""}`}>{artifact?.displayName}</Text>
        </View>
    );
});

export default ArtShowCard;