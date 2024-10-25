import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { constants } from '../../../constants';
import { useKaleidoCrud } from '../../../context/kaleidoscopeCrudContext';

const CuratedCard = (props) => {
    const { show, selectedShow, handleShowClick } = props;
    const { fontsLoaded } = useKaleidoCrud();
    const isSelected = selectedShow?.displayName === show?.displayName;

    const minutes = String(Math.floor(show?.duration / 60)).padStart(2, '0');
    const seconds = String(Math.floor(show?.duration % 60)).padStart(2, '0');
    // console.log(new Date().getMinutes(),new Date().getDate(),new Date().getSeconds())
    return (
        <TouchableOpacity
            className={`flex flex-row gap-3 bg-black rounded-xl shadow-md w-[369]  mt-0 mb-0 mx-0 ${isSelected ? "border-white border-2" : "border-transparent border-2"}`}
            onPress={() => handleShowClick({ showName: show })}
        >
            {/* Image Section */}
            <View className="pb-3">
                <Image                    
                    className="w-48 h-36 object-cover rounded-md "
                    source={{
                        uri: `${constants.backendUrl}/curateThumbnail/${show?.displayName}.png`,
                        cache: 'default'
                    }}
                    alt={show.displayName}
                />                
            </View>

            {/* Text Section */}
            <View className="flex-col justify-end w-fit mb-2">
                <Text className={`text-white ${fontsLoaded ? "font-gBold" : ""}`}>{show?.displayName}</Text>
                <Text className={`text-white mt-1 text-xs  ${fontsLoaded ? "font-gBold" : ""}`}>{minutes} : {seconds}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CuratedCard;
