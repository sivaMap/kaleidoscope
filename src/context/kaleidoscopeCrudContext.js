import React, { createContext, useContext, useState } from 'react'
import { constants } from '../constants';

const kaleidoscopesCrudContext = createContext();

export const KaleidoscopeCrudContext = ({ children }) => {
    //used in volumeBar
    const [loadName, setLoadName] = useState(constants.loadScreen.default);
    const [isShowRunning, setisShowRunning] = useState(false);

    const toggleShowRun = () => {
        setisShowRunning(prev => !prev);
    }

    // state is update for Home Page Navigation
    const navigateHomeScreen = () => {
        setLoadName(constants.loadScreen.default);
    }

    const value = {
        loadName,
        setLoadName,
        isShowRunning,
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