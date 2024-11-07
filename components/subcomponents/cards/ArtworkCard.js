import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { constants } from '../../../constants';
import { useKaleidoCrud } from '../../../context/kaleidoscopeCrudContext';

const ArtworkCard = memo(function ArtworkCard(props) {
    const { artifact, selectedArtificats, handleArtifactSelect, handleArtificateUndoSelect } = props;
    const { fontsLoaded } = useKaleidoCrud();
    const isSelected = selectedArtificats.some(selectedArtificat => selectedArtificat?.displayName === artifact?.displayName);

    return (
        <TouchableOpacity
            className={`rounded-lg shadow-md p-2 mb-6 ${isSelected ? "bg-white" : ""}`}
            // className={`rounded-lg shadow-md p-2 mb-6`}
            onPress={() => {
                isSelected ? handleArtificateUndoSelect({ artifact }) : handleArtifactSelect({ artifact });
            }}
        >
            <View className="w-40">
                <View className={`h-40 w-40 rounded-lg mb-2 ${isSelected ? "bg-white" : ""}`}>
                {/* <View className={`h-40 w-40 rounded-lg mb-2 ${isSelected ? "border-8 border-white" : ""}`}> */}
                    <Image
                        source={{ uri: `${constants.backendUrl}/artThumbnail/${artifact?.displayName}.png?timestamp=${new Date().getMinutes()}` }}
                        alt={artifact?.displayName}
                        className="w-full h-full rounded-lg object-cover"
                    />
                </View>
                <Text className={`text-center text-xs ${fontsLoaded ? "font-gBold" : ""} ${isSelected ? "text-black" : "text-white"}`}>{artifact?.displayName}</Text>
                {/* <Text className={`text-center text-xs ${fontsLoaded ? "font-gBold" : ""} text-white`}>{artifact?.displayName}</Text> */}
            </View>
        </TouchableOpacity>
    );
});

export default ArtworkCard;