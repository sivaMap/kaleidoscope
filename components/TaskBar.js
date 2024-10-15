import React from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';

const TaskBar = () => {
    const { fontsLoaded, setIpVisible } = useKaleidoCrud();
    const { width } = useWindowDimensions();

    return (
        <View className={`flex flex-row justify-between w-full ${width < 770 ? "h-10" : "h-[70px]"} flex-shrink-0 flex-none`}
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
            {/* MAP SYMBOL */}
            <View className="flex flex-col justify-center  pl-5 h-[72px] w-[139px]">
                <View className="w-24 h-12">
                    <Image
                        source={require('../assets/images/map.png')}
                        alt="map"
                        className="px-9 py-0"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

            </View>

            {/* TEXT */}
            <View className="flex flex-col justify-center">
                <Text className={` text-white text-2xl pr-8 ${fontsLoaded ? "font-gBold" : ""} `}                
                >
                    KALEIDOSCOPE
                </Text>
            </View>

            {/* OPEZEE SYMBOL */}
            <View className="flex flex-col justify-center ">
                <View className="pr-3">
                    <TouchableOpacity className="w-[82px] h-[30px]" onPress={() => setIpVisible(true)}>
                        <Image
                            source={require('../assets/images/opezee.png')}
                            alt="opezee"
                            className="py-0 w-full h-full"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TaskBar;
