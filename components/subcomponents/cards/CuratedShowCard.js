import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { constants } from '../../../constants';
import { useKaleidoCrud } from '../../../context/kaleidoscopeCrudContext';

const CuratedShowCard = (props) => {
    const { show, selectedShow, handleShowClick } = props;
    const { fontsLoaded } = useKaleidoCrud();
    const isSelected = selectedShow?.displayName === show?.displayName;

    const minutes = String(Math.floor(show?.duration / 60)).padStart(2, '0');
    const seconds = String(Math.floor(show?.duration % 60)).padStart(2, '0');
    // console.log(new Date().getMinutes(),new Date().getDate(),new Date().getSeconds())
    return (
        <TouchableOpacity
            // className={`flex flex-row gap-x-2 bg-black rounded-xl shadow-md p  mt-0 mb-0 mx-0 ${isSelected ? "border-white border-2" : "border-transparent border-2"}`}
            className={`rounded-lg shadow-md `}
            onPress={() => handleShowClick({ showName: show })}
        >
            {/* Image Section */}
            <View className="w-32 gap-y-2">
                <Image
                    className="w-32 h-32 object-cover rounded-md"
                    source={{
                        uri: `${constants.backendUrl}/curateThumbnail/${show?.displayName}.png`,
                        cache: 'default'
                    }}
                    alt={show.displayName}
                />
                {/* <Text className={`text-white text-center ${fontsLoaded ? "font-gBold" : ""}`}>{show?.displayName}</Text> */}
                <Text className={`text-center text-xs ${fontsLoaded ? "font-gBold" : ""} ${isSelected ? "text-black" : "text-white"}`}>{show?.displayName}</Text>
            </View>          
        </TouchableOpacity>
    );
};

export default CuratedShowCard;
