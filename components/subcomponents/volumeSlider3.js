import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'
// import { useDebounce } from '../../hooks/useDebounce';
import { constants } from '../../constants';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

const volumeSlider3 = ({ isShowRunning }) => {

    const muteVolume = (
        <Svg className="-mt-2 " xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 -960 960 960" width="35px" fill="#5f6368"><Path d="M625.67-308.67 566.33-368l112-111.33-112-111.34L625.67-650 737-538l111.33-112 59.34 59.33-112 111.34 112 111.33-59.34 59.33-111.33-112-111.33 112ZM93-346.67v-266.66h169.33l218.67-220v706.66l-218.67-220H93ZM397-626l-98.67 96.67H177v98.66h121.33L397-333.33V-626ZM294-480.67Z" fill="white" /></Svg>
    )

    const lowVolume = (
        <Svg className="-mt-1 -ml-1.5" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="39px" fill="#5f6368"><Path d="M182.33-346.67v-266.66h169.34l218.66-220v706.66l-218.66-220H182.33Zm454.67 40v-346.66q56 20 88.67 67.33 32.66 47.33 32.66 106t-32.66 105.67q-32.67 47-88.67 67.66ZM486.33-626l-98.66 96.67H266.33v98.66h121.34l98.66 97.34V-626ZM374.67-480Z" fill="white" /></Svg>
    );

    const highVolume = (
        <Svg className="-mt-2" xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 -960 960 960" width="35px" fill="#5f6368"><Path d="M549.33-81.67v-86q108.67-27.33 177-115 68.34-87.66 68.34-199.33 0-110.67-68.5-197.67-68.5-87-176.84-114.33v-86q144.34 27.33 236.84 139.5t92.5 258.5q0 148-92.17 260.83-92.17 112.84-237.17 139.5Zm-468-265v-266.66h169.34l218.66-220v706.66l-218.66-220H81.33Zm454.67 40v-346.66q55 19.66 88.17 67.16 33.16 47.5 33.16 106.17t-33.16 106.17Q591-326.33 536-306.67ZM385.33-626l-98.66 96.67H165.33v98.66h121.34l98.66 97.34V-626ZM293-480Z" fill="white" /></Svg>
    );

    const volumeChanger = 45;
    // const debounceTiming = 300;
    const [isSliderEnabled, setSliderEnable] = useState(false);
    const [volume, setVolume] = useState(5);

    // const debounceFunction = useCallback(() => {
    //     fetch(`${constants.backendUrl}/art/control`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "control": "volume",
    //             "volume": volume
    //         }),
    //     })
    //         .catch(error => console.error('Error setting volume:', error));
    // }, [volume]);

    // useDebounce(debounceFunction, debounceTiming, [volume]);

    useEffect(() => {
        if (constants.backendUrl === "http://0.0.0.0:5001") return

        fetch(`${constants.backendUrl}/art/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "control": "volume",
                "volume": volume
            }),
        })
            .catch(error => console.error('Error setting volume:', error));
    }, [volume])

    useEffect(() => {
        setSliderEnable(false);
    }, [isShowRunning]);

    return (

        <View
            style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderColor: 'rgba(256,256,256,0.7)',
                borderWidth: 2
            }}
            className="flex flex-row items-center  w-2/4 pl-2 ml-2 pr-0 py-2 rounded-full mt-2 mb-4">
            <TouchableOpacity onPress={() => setSliderEnable(prev => !prev)}>
                <View style={{ width: 28, height: 28 }}>
                    {volume < volumeChanger ?
                        volume === 0 ? muteVolume : lowVolume
                        : highVolume}
                </View>
            </TouchableOpacity>

            <Slider
                style={{ width: "90%", height: 20, marginLeft: 2, marginTop: -2 }}
                minimumValue={0}
                maximumValue={100}
                step={5}
                value={volume}
                onValueChange={(value) => {
                    setVolume(value)
                }}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255, 255, 255, 1)"
                thumbTintColor="#FFFFFF"
            />
            <View style={{ width: "84%", height: 3, marginLeft: "-87%", backgroundColor: '#FFFFFF', borderRadius: 3 }} />
        </View>


    );
    // return (
    //     !isSliderEnabled ? (
    //         <View className='w-36 ml-2 pl-2 pr-0 py-1 rounded-full'>
    //             <TouchableOpacity onPress={() => setSliderEnable(prev => !prev)}>
    //                 {volume === 0 ? muteVolume : (<Svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 38" fill="none">
    //                     <Path d="M0 25.9999V11.9999H9.33333L21 0.333252V37.6666L9.33333 25.9999H0ZM25.6667 28.3333V9.54992C27.4167 10.3666 28.8264 11.6305 29.8958 13.3416C30.9653 15.0527 31.5 16.9388 31.5 18.9999C31.5 21.061 30.9653 22.9277 29.8958 24.5999C28.8264 26.2721 27.4167 27.5166 25.6667 28.3333ZM16.3333 11.6499L11.3167 16.6666H4.66667V21.3333H11.3167L16.3333 26.3499V11.6499Z" fill="white" />
    //                 </Svg>)
    //                 }

    //             </TouchableOpacity>
    //         </View>
    //     ) : (
    //         <View
    //             style={{
    //                 backgroundColor: 'rgba(0,0,0,0.3)',
    //             }}
    //             className="flex flex-row items-center  w-36 pl-2 ml-2 pr-0 py-1 rounded-full">
    //             <TouchableOpacity onPress={() => setSliderEnable(prev => !prev)}>
    //                 <View style={{ width: 28, height: 28 }}>
    //                     {volume < volumeChanger ?
    //                         volume === 0 ? muteVolume : lowVolume
    //                         : highVolume}
    //                 </View>
    //             </TouchableOpacity>

    //             <Slider
    //                 style={{ width: 110, height: 20, marginLeft: 0, marginTop: -2 }}
    //                 minimumValue={0}
    //                 maximumValue={100}
    //                 step={5}
    //                 value={volume}
    //                 onValueChange={(value) => {
    //                     setVolume(value)
    //                 }}
    //                 minimumTrackTintColor="#FFFFFF"
    //                 maximumTrackTintColor="rgba(255, 255, 255, 1)"
    //                 thumbTintColor="#FFFFFF"
    //             />
    //         </View>
    //         // {/* <View style={{ width: 90, height: 3, marginLeft: 5, backgroundColor: '#FFFFFF', borderRadius: 3 }}> */}
    //         // {/* </View> */}
    //     )
    // );
};

export default volumeSlider3;
