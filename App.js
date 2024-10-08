import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskBar from './components/TaskBar';
import VolumeBar from './components/VolumeBar';
import { KaleidoscopeCrudContext } from './context/kaleidoscopeCrudContext';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Geometria-Bold": require("./assets/fonts/geometria/Geometria-Bold.ttf"),
    "Geometria-BoldItalic": require("./assets/fonts/geometria/Geometria-BoldItalic.ttf"),
    "Geometria-ExtraBold": require("./assets/fonts/geometria/Geometria-ExtraBold.ttf"),
    "Geometria-ExtraBoldItalic": require("./assets/fonts/geometria/Geometria-ExtraBoldItalic.ttf"),
    "Geometria-ExtraLight": require("./assets/fonts/geometria/Geometria-ExtraLight.ttf"),
    "Geometria-ExtraLightItalic": require("./assets/fonts/geometria/Geometria-ExtraLightItalic.ttf"),
    "Geometria-Heavy": require("./assets/fonts/geometria/Geometria-Heavy.ttf"),
    "Geometria-HeavyItalic": require("./assets/fonts/geometria/Geometria-HeavyItalic.ttf"),
    "Geometria-Italic": require("./assets/fonts/geometria/Geometria-Italic.ttf"),
    "Geometria-Light": require("./assets/fonts/geometria/Geometria-Light.ttf"),
    "Geometria-LightItalic": require("./assets/fonts/geometria/Geometria-LightItalic.ttf"),
    "Geometria-MediumItalic": require("./assets/fonts/geometria/Geometria-MediumItalic.ttf"),
    "Geometria-Thin": require("./assets/fonts/geometria/Geometria-Thin.ttf"),
    "Geometria-ThinItalic": require("./assets/fonts/geometria/Geometria-ThinItalic.ttf"),
    "Geometria": require("./assets/fonts/geometria/Geometria.ttf"),
  });

  return (
    // <SafeAreaView className="flex-1 bg-black bg-opacity-80 relative flex-col gap-10">
    <SafeAreaView
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      className="flex-1 relative flex-col justify-between h-screen"
    >
      <KaleidoscopeCrudContext>        
        <TaskBar />
        {/* <Kaleidoscope /> */}
        <VolumeBar />        
      </KaleidoscopeCrudContext>
      <StatusBar style="auto" hidden={true} />
    </SafeAreaView>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'rgba(0,0,0,0.8)',
//     flex: 1,
//     justifyContent: 'space-between',
//     padding: 10,
//   },
// });
