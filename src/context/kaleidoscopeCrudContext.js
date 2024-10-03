import React, { createContext, useContext, useState } from 'react'

const kaleidoscopesCrudContext = createContext();

export const KaleidoscopeCrudContext = ({children}) => {
    //used in volumeBar
    const [isShowRunning, setisShowRunning] = useState(false);

    const toggleShowRun = () => {
        setisShowRunning(prev => !prev);
    }

    const value = {
        isShowRunning,
        toggleShowRun
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