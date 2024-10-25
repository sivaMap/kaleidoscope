import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { constants } from '../../constants';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';

const Home = () => {
    const { setLoadName, fontsLoaded } = useKaleidoCrud();

    return (
        <View className="flex flex-col justify-center gap-4 mt-4 mb-0 h-5/6">
            <View className="flex flex-row justify-center ">
                <TouchableOpacity
                    onPress={() => setLoadName(constants.loadScreen.curate)}>
                    <View style={styles.borderContainer}>
                        <Text
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)',
                            }}
                            className={` rounded-full px-20 py-6 text-center text-lg text-white ${fontsLoaded ? "font-gBold" : ""}`}
                        >
                            Experience a curated show
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>


            <View className="mb-3 flex flex-row justify-center items-center gap-5">
                <View style={{ borderColor: 'rgba(255, 255, 255, 0.3)', fontFamily: fontsLoaded ? 'Geometria' : '' }} className="w-2/12 border-t mx-2" />
                <Text
                    className={`text-white text-lg ${fontsLoaded ? "font-gBold" : ""}`}>OR</Text>
                <View style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} className="w-2/12 border-t mx-2" />
            </View>

            <View className="flex flex-row justify-center">
                <TouchableOpacity onPress={() => setLoadName(constants.loadScreen.art)}>
                    <View style={styles.borderContainer}>
                        <Text
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)',
                            }}
                            className={`rounded-full px-24 py-6 text-center text-lg text-white ${fontsLoaded ? "font-gBold" : ""}`}>
                            Create your own show
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    borderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        borderRadius: 50,
    },
});