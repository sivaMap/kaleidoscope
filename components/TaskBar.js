import React from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';

const TaskBar = () => {
    const { fontsLoaded, setIpVisible } = useKaleidoCrud();
    const { width } = useWindowDimensions();


    return (
        <View className={`flex flex-row justify-between w-full  ${width < 770 ? "h-10" : "h-16"} flex-shrink-0 flex-none`}
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
            {/* MAP SYMBOL */}
            <View className="flex flex-col justify-center  pl-5">
                <View className="w-4 h-10">
                    <Image
                        source={require('../assets/images/map.png')}
                        alt="map"
                        className="px-6 py-0"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

            </View>

            {/* TEXT */}
            <View className="flex flex-col justify-center">
                <Text className="font-medium text-white text-xl"
                    style={{ fontFamily: fontsLoaded ? 'Geometria' : '' }}
                >
                    KALEIDOSCOPE
                </Text>
            </View>

            {/* OPEZEE SYMBOL */}
            <View className="flex flex-col justify-center">
                <View className="w-20 h-10">
                    <TouchableOpacity onPress={() => setIpVisible(true)}>
                        <Image
                            source={require('../assets/images/opezee.png')}
                            alt="opezee"
                            className="pl-16 py-0 w-3 h-6"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TaskBar;
