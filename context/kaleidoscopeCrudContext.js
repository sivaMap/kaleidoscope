import React, { createContext, useContext, useState } from 'react'
import { constants } from '../constants';
import { useFonts } from 'expo-font';
import { useWindowDimensions } from 'react-native';

const kaleidoscopesCrudContext = createContext();

export const KaleidoscopeCrudContext = ({ children }) => {
    //used in volumeBar
    const [loadName, setLoadName] = useState(constants.loadScreen.default);
    const [isShowRunning, setisShowRunning] = useState(false);
    const [ipVisible, setIpVisible] = useState(false);
    const { width } = useWindowDimensions();

    const [fontsLoaded, error] = useFonts({
        "Geometria-Bold": require("../assets/fonts/geometria/Geometria-Bold.ttf"),
        "Geometria-BoldItalic": require("../assets/fonts/geometria/Geometria-BoldItalic.ttf"),
        "Geometria-ExtraBold": require("../assets/fonts/geometria/Geometria-ExtraBold.ttf"),
        "Geometria-ExtraBoldItalic": require("../assets/fonts/geometria/Geometria-ExtraBoldItalic.ttf"),
        "Geometria-ExtraLight": require("../assets/fonts/geometria/Geometria-ExtraLight.ttf"),
        "Geometria-ExtraLightItalic": require("../assets/fonts/geometria/Geometria-ExtraLightItalic.ttf"),
        "Geometria-Heavy": require("../assets/fonts/geometria/Geometria-Heavy.ttf"),
        "Geometria-HeavyItalic": require("../assets/fonts/geometria/Geometria-HeavyItalic.ttf"),
        "Geometria-Italic": require("../assets/fonts/geometria/Geometria-Italic.ttf"),
        "Geometria-Light": require("../assets/fonts/geometria/Geometria-Light.ttf"),
        "Geometria-LightItalic": require("../assets/fonts/geometria/Geometria-LightItalic.ttf"),
        "Geometria-MediumItalic": require("../assets/fonts/geometria/Geometria-MediumItalic.ttf"),
        "Geometria-Thin": require("../assets/fonts/geometria/Geometria-Thin.ttf"),
        "Geometria-ThinItalic": require("../assets/fonts/geometria/Geometria-ThinItalic.ttf"),
        "Geometria": require("../assets/fonts/geometria/Geometria.ttf"),
    });

    const toggleShowRun = () => {
        setisShowRunning(prev => !prev);
    }

    // state is update for Home Page Navigation
    const navigateHomeScreen = () => {
        if (isShowRunning) {
            fetch(`${constants.backendUrl}/curate/control`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "control": "stop"
                }),
            })
                .catch(error => console.error('Error stoping Show:', error));            
        }
        setLoadName(constants.loadScreen.default);
        setisShowRunning(false);
    }

    const value = {
        width,
        loadName,
        setLoadName,
        isShowRunning,
        fontsLoaded, error,
        ipVisible, setIpVisible,
        toggleShowRun,
        navigateHomeScreen
    };

    return (
        <kaleidoscopesCrudContext.Provider value={value}>
            {children}
        </kaleidoscopesCrudContext.Provider>
    );
}


export function useKaleidoCrud() {
    return useContext(kaleidoscopesCrudContext);
}