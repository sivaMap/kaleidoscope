import React from 'react'
import { BackHandler, Platform, TouchableOpacity } from 'react-native'
import Svg, { G, Mask, Path, Rect } from 'react-native-svg'
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';

const SvgSideBar = () => {
    const { loadName, navigateHomeScreen } = useKaleidoCrud();

    const exitApp = () => {
        if (Platform.OS === 'android') {
            BackHandler.exitApp();
        }
        fetch(`${constants.backendUrl}/art/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                control: "exit",
            }),
        }).catch(error => console.error('Error fetching apps:', error));
    }

    const loadSvg = () => {
        switch (loadName) {
            case constants.loadScreen.default:
                return (
                    <TouchableOpacity
                        onPress={exitApp}
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: 18,
                            zIndex: 1,
                            backgroundColor: 'rgba(256,256,256,1)',
                            borderRadius: 100,
                            padding: 3,
                        }}
                    >
                        <Svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <Path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" fill="black" />
                        </Svg>

                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity
                        onPress={navigateHomeScreen}
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: 12,
                            zIndex: 1,
                            backgroundColor: 'rgba(0,0,0,1)',
                            borderRadius: 100,
                            padding: 8,
                        }}
                    >
                        <Svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 -960 960 960" fill="#5f6368">
                            <Path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" fill="white" />
                        </Svg>
                    </TouchableOpacity>
                );
        }
    }

    return (
        loadSvg()
    )
}

export default SvgSideBar