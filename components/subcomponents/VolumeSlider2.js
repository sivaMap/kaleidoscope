import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'
import { useDebounce } from '../../hooks/useDebounce';
import { constants } from '../../constants';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

const VolumeSlider2 = ({ isShowRunning }) => {
    const lowVolume = (
        <Svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 32 38" fill="none">
            <Path d="M0 25.9999V11.9999H9.33333L21 0.333252V37.6666L9.33333 25.9999H0ZM25.6667 28.3333V9.54992C27.4167 10.3666 28.8264 11.6305 29.8958 13.3416C30.9653 15.0527 31.5 16.9388 31.5 18.9999C31.5 21.061 30.9653 22.9277 29.8958 24.5999C28.8264 26.2721 27.4167 27.5166 25.6667 28.3333ZM16.3333 11.6499L11.3167 16.6666H4.66667V21.3333H11.3167L16.3333 26.3499V11.6499Z" fill="#BABABA" />
        </Svg>
    );

    const highVolume = (
        <Svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 44 44" fill="none">
            <Mask id="mask0_1660_26259" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
                <Rect width="44" height="44" fill="#D9D9D9" />
            </Mask>
            <G mask="url(#mask0_1660_26259)">
                <Path d="M28.1286 41.9127V37.6955C31.2143 36.8041 33.7 35.0898 35.5857 32.5527C37.4714 30.0155 38.4143 27.1355 38.4143 23.9127C38.4143 20.6898 37.4714 17.8098 35.5857 15.2727C33.7 12.7355 31.2143 11.0213 28.1286 10.1298V5.91269C32.38 6.87269 35.8429 9.02412 38.5171 12.367C41.1914 15.7098 42.5286 19.5584 42.5286 23.9127C42.5286 28.267 41.1914 32.1155 38.5171 35.4584C35.8429 38.8013 32.38 40.9527 28.1286 41.9127ZM5.5 30.1355V17.7927H13.7286L24.0143 7.50698V40.4213L13.7286 30.1355H5.5ZM28.1286 32.1927V15.6327C29.74 16.387 31 17.5184 31.9086 19.027C32.8171 20.5355 33.2714 22.1813 33.2714 23.9641C33.2714 25.7127 32.8171 27.3327 31.9086 28.8241C31 30.3155 29.74 31.4384 28.1286 32.1927ZM19.9 17.4841L15.4771 21.907H9.61429V26.0213H15.4771L19.9 30.4441V17.4841Z" fill="white" />
            </G>
        </Svg>
    );

    const volumeChanger = 45;
    const debounceTiming = 300;
    const [isSliderEnabled, setSliderEnable] = useState(false);
    const [volume, setVolume] = useState(5);

    const debounceFunction = useCallback(() => {
        // fetch(`${constants.backendUrl}/art/control`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "control": "volume",
        //         "volume": volume
        //     }),
        // })
        //     .catch(error => console.error('Error fetching apps:', error));
    }, [volume]);

    useDebounce(debounceFunction, debounceTiming, [volume]);

    // useEffect(() => {
    //     setSliderEnable(false);
    // }, [isShowRunning]);

    return (
        !isSliderEnabled || !isShowRunning ? (
            <View className='w-32 ml-2 pl-2 pr-0 py-1 rounded-full'>
                <TouchableOpacity onPress={() => isShowRunning && setSliderEnable(prev => !prev)}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 38" fill="none">
                        <Path d="M0 25.9999V11.9999H9.33333L21 0.333252V37.6666L9.33333 25.9999H0ZM25.6667 28.3333V9.54992C27.4167 10.3666 28.8264 11.6305 29.8958 13.3416C30.9653 15.0527 31.5 16.9388 31.5 18.9999C31.5 21.061 30.9653 22.9277 29.8958 24.5999C28.8264 26.2721 27.4167 27.5166 25.6667 28.3333ZM16.3333 11.6499L11.3167 16.6666H4.66667V21.3333H11.3167L16.3333 26.3499V11.6499Z" fill="#BABABA" />
                    </Svg>
                </TouchableOpacity>
            </View>
        ) : (
            <View className="flex flex-row items-center  w-32 pl-2 ml-2 pr-0 py-1 rounded-full bg-black bg-opacity-30">
                <TouchableOpacity onPress={() => isShowRunning && setSliderEnable(prev => !prev)}>
                    {volume < volumeChanger ? lowVolume : highVolume}
                </TouchableOpacity>

                <Slider
                    style={{ width: 110, height: 6, marginLeft: -10 }}
                    minimumValue={0}
                    maximumValue={100}
                    step={5}
                    value={volume}
                    onValueChange={(value) => setVolume(value)}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#FFFFFF"
                    thumbTintColor="#FFFFFF"
                />

            </View>
        )
    );
};

export default VolumeSlider2;
