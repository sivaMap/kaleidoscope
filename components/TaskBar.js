import React from 'react';
import { View, Text, Image } from 'react-native';

const TaskBar = () => {
    return (
        <View className="flex flex-row justify-between bg-black bg-opacity-30 w-full h-10 flex-shrink-0 flex-none">
            {/* MAP SYMBOL */}
            <View className="flex flex-col justify-center w-5 h-10 -pl-5">
                <Image
                    source={require('../assets/images/map.png')}
                    alt="map"
                    className="px-6 py-0"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>

            {/* TEXT */}
            <View className="flex flex-col justify-center">
                <Text className="font-medium text-white text-2xl" style={{ fontFamily: 'Geometria' }}>
                    KALEIDOSCOPE
                </Text>
            </View>

            {/* OPEZEE SYMBOL */}
            <View className="flex flex-col justify-center w-20 h-10">
                <Image
                    source={require('../assets/images/opezee.png')} 
                    alt="opezee"                    
                    className="pl-16 py-0 w-3 h-6"                    
                />
            </View>
        </View>
    );
};

export default TaskBar;
