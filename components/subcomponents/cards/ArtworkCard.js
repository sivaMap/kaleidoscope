import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { constants } from '../../../constants';

const ArtworkCard = memo(function ArtworkCard(props) {
    const { artifact, selectedArtificats, handleArtifactSelect, handleArtificateUndoSelect } = props;
    const isSelected = selectedArtificats.some(selectedArtificat => selectedArtificat?.displayName === artifact?.displayName);

    return (
        <TouchableOpacity
            className={`rounded-lg shadow-md p-2 mb-2 ${isSelected ? "bg-white" : ""}`}
            onPress={() => {
                isSelected ? handleArtificateUndoSelect({ artifact }) : handleArtifactSelect({ artifact });
            }}
        >
            <View className="h-36 rounded-lg mb-0">
                <Image
                    source={{ uri: `${constants.backendUrl}/artThumbnail/${artifact?.displayName}.png` }}
                    alt={artifact?.displayName}
                    className="w-full h-full rounded-lg object-cover"
                />
            </View>
            <Text className={`text-center ${isSelected ? "text-black" : ""}`}>{artifact?.displayName}</Text>
        </TouchableOpacity>
    );
});

export default ArtworkCard;