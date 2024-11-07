// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Animated } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { styled } from 'nativewind';

// const convertSeconds = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;

//     return { hours, minutes, seconds: secs };
// };

// // TimeDisplay component for React Native
// const TimeDisplay = ({ totalSeconds }) => {
//     const { hours, minutes, seconds } = convertSeconds(totalSeconds);
//     return (
//         <Text className="text-gray-700">
//             {hours}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//         </Text>
//     );
// };

// const ProgressBar = ({ status }) => {
//     const [currentFileName, setCurrentFileName] = useState('');
//     const [currentTime, setCurrentTime] = useState(status?.time || 0);
//     const animatedValue = useRef(new Animated.Value(currentTime)).current;

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentTime((prevTime) => {
//                 const newTime = prevTime + 1;
//                 Animated.timing(animatedValue, {
//                     toValue: newTime,
//                     duration: 1000,
//                     useNativeDriver: false,
//                 }).start();
//                 return newTime;
//             });
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     const [sliderValue, setSliderValue] = useState(currentTime);
//     useEffect(() => {
//         const listener = animatedValue.addListener(({ value }) => {
//             setSliderValue(value);
//         });

//         return () => animatedValue.removeListener(listener);
//     }, []);

//     return (
//         <View className="flex-row items-center space-x-2">
//             <TimeDisplay totalSeconds={currentTime} />
//             <Slider
//                 style={{ flex: 1 }}
//                 minimumValue={0}
//                 maximumValue={status?.length || 0}
//                 value={sliderValue}
//                 minimumTrackTintColor="#FFFFFF"
//                 maximumTrackTintColor="rgba(255, 255, 255, 1)"
//                 thumbTintColor="#FFFFFF"
//                 onSlidingComplete={(value) => {
//                     setCurrentTime(value);
//                     animatedValue.setValue(value);
//                 }}
//             />
//             <TimeDisplay totalSeconds={status?.length} />
//         </View>
//     );
// };

// export default ProgressBar;

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider'; // Use a slider package like this for React Native

const convertSeconds = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
        seconds = 0;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { hours, minutes, seconds: secs };
};

// TimeDisplay component for React Native
const TimeDisplay = ({ totalSeconds }) => {
    const { minutes, seconds } = convertSeconds(totalSeconds);

    return (
        <Text className="text-white">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
    );
};

const ProgressBar = (props) => {
    const { status } = props

    return (
        <View className="flex-row items-center justify-between space-x-2">
            <TimeDisplay totalSeconds={status?.PlaybackTime} />
            <TouchableWithoutFeedback>
                <Slider
                    className='bg-white'
                    style={{ flex: 1 }}
                    minimumValue={0}
                    maximumValue={status?.MediaDuration}
                    // step={0.1}
                    value={status?.PlaybackTime}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="rgba(255, 255, 255, 1)"
                    thumbTintColor="#FFFFFF"
                // disabled={true}               

                />
            </TouchableWithoutFeedback>
            <TimeDisplay totalSeconds={status?.MediaDuration} />
        </View>
    );
};

export default ProgressBar;