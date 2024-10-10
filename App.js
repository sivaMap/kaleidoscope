import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskBar from './components/TaskBar';
import VolumeBar from './components/VolumeBar';
import { KaleidoscopeCrudContext } from './context/kaleidoscopeCrudContext';
import Kaleidoscope from './components/Kaleidoscope';
import IpConfig from './components/subcomponents/IpConfig';
import React, { useEffect } from 'react';
import { updateConstants } from './constants';


export default function App() {
  useEffect(() => {    
    const fncall = async () => {

      await updateConstants();
    }
    fncall();

  }, [])

  return (
    // <SafeAreaView className="flex-1 bg-black bg-opacity-80 relative flex-col gap-10">
    <SafeAreaView
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}      
      className="flex-1 relative flex-col justify-between h-screen"
    >
      <KaleidoscopeCrudContext>
        <TaskBar />
        <Kaleidoscope />
        <VolumeBar />
        <IpConfig />
      </KaleidoscopeCrudContext>
      <StatusBar style="auto" hidden={true} />
    </SafeAreaView>

  );
}