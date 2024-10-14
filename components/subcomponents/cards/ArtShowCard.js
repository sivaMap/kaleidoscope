import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { constants } from '../../../constants';
import { useKaleidoCrud } from '../../../context/kaleidoscopeCrudContext';

const ArtShowCard = memo(function ArtShowCard(props) {
    const { artifact } = props;
    const {  fontsLoaded } = useKaleidoCrud();

    return (
        <View className="rounded-lg shadow-md p-2 mb-2 w-56">
            <View className="h-56 rounded-lg mb-0">
                <Image
                    source={{ uri: `${constants.backendUrl}/artThumbnail/${artifact?.displayName}.png` }}
                    alt={artifact?.displayName}
                    className="w-full h-full rounded-lg object-cover"
                />
            </View>
            <Text className={`text-center text-white mt-2 ${fontsLoaded ? "font-gGeometria" : ""}`}>{artifact?.displayName}</Text>
        </View>
    );
});

export default ArtShowCard;