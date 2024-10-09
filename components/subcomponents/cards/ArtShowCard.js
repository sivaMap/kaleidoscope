import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { constants } from '../../../constants';

const ArtShowCard = memo(function ArtShowCard(props) {
    const { artifact } = props;

    return (
        <View className="rounded-lg shadow-md p-2 mb-2">
            <View className="h-44 rounded-lg mb-0">
                <Image
                    source={{ uri: `${constants.backendUrl}/artThumbnail/${artifact?.displayName}.png` }}
                    alt={artifact?.displayName}
                    className="w-full h-full rounded-lg object-cover"
                />
            </View>
            <Text className="text-center">{artifact?.displayName}</Text>
        </View>
    );
});

export default ArtShowCard;