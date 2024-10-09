import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { constants } from '../../constants';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';

const Home = () => {
    const { setLoadName } = useKaleidoCrud();

    return (
        <View className="flex flex-col justify-center gap-4 mt-4 mb-0 h-5/6">
            <Pressable
                className="flex flex-row justify-center" onPress={() => setLoadName(constants.loadScreen.curate)}>
                <View style={styles.borderContainer}>
                    <Text
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',borderColor: 'rgba(255, 255, 255, 0.3)' }}
                        // style={styles.text}
                        className=" rounded-full px-20 py-5 text-center text-base text-white"
                    >
                        Experience a Curated Show
                    </Text>
                </View>
            </Pressable>

            <View className="mb-3 flex flex-row justify-center items-center gap-5">
                <View style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} className="w-2/12 border-t mx-2" />
                <Text className="text-white">OR</Text>
                <View style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} className="w-2/12 border-t mx-2" />
            </View>

            <Pressable className="flex flex-row justify-center" onPress={() => setLoadName(constants.loadScreen.art)}>
                <View style={styles.borderContainer}>
                    <Text
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                        className="rounded-full px-24 py-6 text-center text-base text-white">
                        Create your own Show
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Optional: Background color for contrast
    },
    borderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Background color for the border
        borderColor: 'rgba(255, 255, 255, 0.3)', // Border color
        borderWidth: 2, // Border width
        borderRadius: 50, // Full round corners
        // paddingHorizontal: 12, // Horizontal padding
        // paddingVertical: 6, // Vertical padding
    },
    text: {
        textAlign: 'center', // Center text
        color: 'white', // Text color
    },
});