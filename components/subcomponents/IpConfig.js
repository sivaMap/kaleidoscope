import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';


const IpConfig = () => {
    const { ipVisible, setIpVisible } = useKaleidoCrud();
    const [ipAddress, setIpAddress] = useState('');
    const [port, setPort] = useState('5001');
    const hideModal = () => { setIpVisible(false) }


    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedIpAddress = await AsyncStorage.getItem('ipAddress');
                const storedPort = await AsyncStorage.getItem('port');

                if (storedIpAddress !== null) {
                    setIpAddress(storedIpAddress);
                }
                if (storedPort !== null) {
                    setPort(storedPort);
                }
            } catch (error) {
                console.error("Failed to load stored data:", error);
            }
        };

        loadStoredData();
    }, []);

    // Function to store IP Address and Port
    const storeData = async () => {
        try {
            console.log('ipAddress', ipAddress, 'port', port)
            await AsyncStorage.setItem('ipAddress', ipAddress);
            await AsyncStorage.setItem('port', port);
            constants.ipAddress = ipAddress;
            constants.port = port;
            console.log('Data stored successfully!');
            hideModal();
        } catch (error) {
            console.error('Failed to store data:', error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={ipVisible}
            onRequestClose={hideModal}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-6/12 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
                    <Text className="text-lg mb-4 text-start">Please enter the following details</Text>

                    <TextInput
                        placeholder="Enter the IP Address"
                        className="w-full border border-gray-800 rounded-md px-4 py-2 mb-4 text-base"
                        value={ipAddress}
                        onChangeText={text => setIpAddress(text)}
                    />

                    <TextInput
                        placeholder="Enter the Port"
                        className="w-full border border-gray-800 rounded-md px-4 py-2 mb-6 text-base"
                        value={port}
                        onChangeText={text => setPort(text)}
                    />

                    <View className="flex-row justify-center gap-6">
                        <TouchableOpacity
                            className="px-6 py-3 rounded-full border border-black"
                            onPress={hideModal}
                        >
                            <Text className="text-black text-center">Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="px-6 py-3 rounded-full bg-black"
                            onPress={storeData}
                        >
                            <Text className="text-white text-center">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default IpConfig;
