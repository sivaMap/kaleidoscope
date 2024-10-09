import React from 'react';
import Home from './subcomponents/Home';
import { constants } from '../constants';
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';
import { View, Text } from 'react-native';
import CuratedShows from './subcomponents/CuratedShows';
import ArtWork from './subcomponents/ArtWork';

const Kaleidoscope = () => {
    const { loadName, width } = useKaleidoCrud();

    // Either one of Three bodies or cases will be loaded based on loadName state
    const loadDocument = () => {
        switch (loadName) {
            case constants.loadScreen.default:
                return <Home key={"KaleidoscopeHome"} />;
            case constants.loadScreen.curate:
                return <CuratedShows key={"KaleidoscopeCurate"} />;
            case constants.loadScreen.art:
                return <ArtWork key={"KaleidoscopeArt"} />;
            default:
                return null;
        }
    };

    return (
        <View className={`flex-grow px-10 ${width < 770 ? "mt-5" : "mt-10"}`}>
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0.4)',                    
                }}
                className="rounded-lg p-4"
            >
                {loadDocument()}
            </View>
        </View>
    );
};

export default Kaleidoscope;
