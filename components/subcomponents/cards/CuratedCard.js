import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { constants } from '../../../constants';

const CuratedCard = (props) => {
    const { show, selectedShow, handleShowClick } = props;
    const isSelected = selectedShow?.displayName === show?.displayName;

    const minutes = Math.floor(show?.duration / 60);
    const seconds = Math.floor(show?.duration % 60);

    return (
        <TouchableOpacity             
            className={`flex flex-row gap-4 bg-black rounded-xl shadow-md w-[350] p-4 mt-0 mb-10 mx-0 ${isSelected ? "border-white border-2" : "border-transparent border-2"}`}
            onPress={() => handleShowClick({ showName: show })}
        >
            {/* Image Section */}
            <View className='h-28'>
                <Image
                    className="w-[150px] h-[150px] object-cover rounded-md"
                    source={{ uri: `${constants.backendUrl}/curateThumbnail/${show?.displayName}.png` }}
                    alt={show.displayName}
                />
            </View>

            {/* Text Section */}
            <View className="flex-col justify-end w-fit">
                <Text className="text-white text-base font-semibold">{show?.displayName}</Text>
                <Text className="text-gray-400 text-sm mt-1">{minutes} : {seconds}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CuratedCard;
