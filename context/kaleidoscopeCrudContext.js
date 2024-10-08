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
        fetch(`${constants.backendUrl}/curate/control`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "control": "stop"
            }),
        })
            .catch(error => console.error('Error fetching apps:', error));
        setLoadName(constants.loadScreen.default);
        setisShowRunning(false);
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