import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
import { constants } from '../../constants';
import { SvgXml } from 'react-native-svg';
import ArtworkCard from './cards/ArtworkCard';
import ArtWorkShows from './ArtWorkShows';
import { ScrollViewIndicator } from '@fanchenbao/react-native-scroll-indicator';

const ArtWork = () => {
    const [artifacts, setArtifcats] = useState([]);
    const [selectedArtificats, setSelectedArtifacts] = useState([]);
    const [loadArt, setLoadArt] = useState(constants.loadArt.show);
    const { navigateHomeScreen, toggleShowRun, fontsLoaded } = useKaleidoCrud();
    const isArtShowSected = selectedArtificats.length === 5;

    const handleArtifactSelect = ({ artifact }) => {
        if (selectedArtificats.length < 5) {
            setSelectedArtifacts(prev => [...prev, artifact]);
        }
    };

    const handleArtificateUndoSelect = ({ artifact }) => {
        const filteredArtifacts = selectedArtificats.filter(selectedArtificat => selectedArtificat?.displayName !== artifact?.displayName);
        setSelectedArtifacts([...filteredArtifacts]);
    };

    useEffect(() => {
        fetch(`${constants.backendUrl}/art`)
            .then(response => response.json())
            .then(data => setArtifcats([...data]))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const loadArtScene = () => {
        let view = [];
        switch (loadArt) {
            case constants.loadArt.show:
                view.push(
                    <View className="relative h-[530] mb-4 px-0" key={"ArtDefault"}>
                        <View className="flex-row justify-between px-1 pr-2 mb-1">
                            <View className="flex-row items-center space-x-0">
                                <TouchableOpacity className="py-2.5 px-3.5 rounded-full" onPress={navigateHomeScreen}>
                                    {/* SVG Back Arrow */}
                                    <SvgXml
                                        xml={`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 15 24" fill="none">
                                  <path d="M12.1337 23.4235L0.382256 11.8353L12.1337 0.24707L14.2196 2.30398L4.55402 11.8353L14.2196 21.3666L12.1337 23.4235Z" fill="white" />
                                </svg>`} />
                                </TouchableOpacity>

                                <Text className={`text-xl text-white ${fontsLoaded ? "font-gBold" : ""}`}>
                                    Select any 5 artworks
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!isArtShowSected) return;
                                    setLoadArt(constants.loadArt.play);
                                    toggleShowRun();
                                }}
                            >
                                <View
                                    style={styles.borderContainer}
                                    className={`border-white border-2 rounded-full px-3 py-2 ${!isArtShowSected ? "opacity-30" : ""}`}
                                >
                                    <Text className={` text-white px-3 py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}>Start Show</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <SafeAreaView style={styles.container}>
                            <ScrollViewIndicator
                                indStyle={{
                                    width: 8,
                                    backgroundColor: 'white',
                                    marginRight: 12
                                }}
                            >
                                <ScrollView className=" -ml-2  px-4 h-full "
                                    indicatorStyle='white'
                                    style={styles.scrollView}
                                    contentContainerStyle={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        paddingHorizontal: 0,
                                        rowGap: 0,
                                        columnGap: 12
                                    }}
                                    persistentScrollbar={true}
                                    scrollEnabled={true}                                                                       
                                >
                                    {artifacts.map((artifact, index) => (
                                        <ArtworkCard
                                            key={index}
                                            artifact={artifact}
                                            selectedArtificats={selectedArtificats}
                                            handleArtifactSelect={handleArtifactSelect}
                                            handleArtificateUndoSelect={handleArtificateUndoSelect}
                                        />
                                    ))}
                                </ScrollView>
                            </ScrollViewIndicator>
                            {artifacts.length > 0 && <View style={styles.track} />}
                        </SafeAreaView>
                    </View>
                );
                break;
            case constants.loadArt.play:
                view.push(
                    <ArtWorkShows
                        key={"CuratePlay"}
                        selectedArtificats={selectedArtificats}
                        setSelectedArtifacts={setSelectedArtifacts}
                        setLoadArt={setLoadArt}
                    />
                );
                break;
            default:
                break;
        }
        return view;
    };

    return loadArtScene();


};

export default ArtWork;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    borderContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
    },
    track: {
        position: 'absolute',
        top: 15,
        right: 14.5,
        width: 3,
        height: '104%',
        backgroundColor: 'white',
        borderRadius: 3
    },
});


// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Animated } from 'react-native';
// import { useKaleidoCrud } from '../../context/kaleidoscopeCrudContext';
// import { constants } from '../../constants';
// import { SvgXml } from 'react-native-svg';
// import ArtworkCard from './cards/ArtworkCard';
// import ArtWorkShows from './ArtWorkShows';

// const ArtWork = () => {
//     const [artifacts, setArtifcats] = useState([]);
//     const [selectedArtificats, setSelectedArtifacts] = useState([]);
//     const [loadArt, setLoadArt] = useState(constants.loadArt.show);
//     const { navigateHomeScreen, toggleShowRun, fontsLoaded } = useKaleidoCrud();
//     const isArtShowSected = selectedArtificats.length === 5;
//     const scrollViewRef = useRef(null);
//     const scrollIndicatorY = useRef(new Animated.Value(0)).current; // For the scroll indicator

//     const handleArtifactSelect = ({ artifact }) => {
//         if (selectedArtificats.length < 5) {
//             setSelectedArtifacts(prev => [...prev, artifact]);
//         }
//     };

//     const handleArtificateUndoSelect = ({ artifact }) => {
//         const filteredArtifacts = selectedArtificats.filter(selectedArtificat => selectedArtificat?.displayName !== artifact?.displayName);
//         setSelectedArtifacts([...filteredArtifacts]);
//     };

//     useEffect(() => {
//         fetch(`${constants.backendUrl}/art`)
//             .then(response => response.json())
//             .then(data => setArtifcats([...data]))
//             .catch(error => console.error('Error fetching artifacts:', error));
//     }, []);

//     const loadArtScene = () => {
//         let view = [];
//         switch (loadArt) {
//             case constants.loadArt.show:
//                 view.push(
//                     <View className="relative h-[548] mb-4 " key={"ArtDefault"}>
//                         <View className="flex-row justify-between">
//                             <View className="flex-row items-center space-x-4">
//                                 <TouchableOpacity className="bg-black py-2 px-3 rounded-full" onPress={navigateHomeScreen}>
//                                     <SvgXml
//                                         xml={`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 15 24" fill="none">
//                                           <path d="M12.1337 23.4235L0.382256 11.8353L12.1337 0.24707L14.2196 2.30398L4.55402 11.8353L14.2196 21.3666L12.1337 23.4235Z" fill="white" />
//                                         </svg>`} />
//                                 </TouchableOpacity>

//                                 <Text className={`text-xl text-white ${fontsLoaded ? "font-gBold" : ""}`}>
//                                     Select any 5 artworks
//                                 </Text>
//                             </View>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     if (!isArtShowSected) return;
//                                     setLoadArt(constants.loadArt.play);
//                                     toggleShowRun();
//                                 }}
//                             >
//                                 <View
//                                     style={styles.borderContainer}
//                                     className={`border-white border-2 rounded-full px-4 py-2 ${!isArtShowSected ? "opacity-30" : ""}`}
//                                 >
//                                     <Text className={` text-white px-3 py-0 text-lg ${fontsLoaded ? "font-gBold" : ""}`}>Start Show</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

//                         <SafeAreaView style={styles.container}>
//                             <ScrollView
//                                 ref={scrollViewRef}
//                                 className="-ml-2 px-4 h-full"
//                                 style={styles.scrollView}
//                                 contentContainerStyle={{
//                                     flexDirection: 'row',
//                                     flexWrap: 'wrap',
//                                     paddingHorizontal: 4,
//                                     gap: 20
//                                 }}
//                                 showsVerticalScrollIndicator={false}
//                                 onScroll={Animated.event(
//                                     [{ nativeEvent: { contentOffset: { y: scrollIndicatorY } } }],
//                                     { useNativeDriver: false }
//                                 )}
//                                 scrollEventThrottle={16}
//                             >
//                                 {artifacts.map((artifact, index) => (
//                                     <ArtworkCard
//                                         key={index}
//                                         artifact={artifact}
//                                         selectedArtificats={selectedArtificats}
//                                         handleArtifactSelect={handleArtifactSelect}
//                                         handleArtificateUndoSelect={handleArtificateUndoSelect}
//                                     />
//                                 ))}
//                             {/* Custom Scroll Indicator */}
//                             <Animated.View
//                                 style={[
//                                     styles.scrollIndicator,
//                                     {
//                                         transform: [{
//                                             translateY: scrollIndicatorY.interpolate({
//                                                 inputRange: [0, 1000], // adjust this range based on your content size
//                                                 outputRange: [0, 2500], // the height of your ScrollView
//                                                 extrapolate: 'clamp',
//                                             }),
//                                         }],
//                                     }
//                                 ]}
//                             />
//                             </ScrollView>
//                         </SafeAreaView>
//                     </View>
//                 );
//                 break;
//             case constants.loadArt.play:
//                 view.push(
//                     <ArtWorkShows
//                         key={"CuratePlay"}
//                         selectedArtificats={selectedArtificats}
//                         setSelectedArtifacts={setSelectedArtifacts}
//                         setLoadArt={setLoadArt}
//                     />
//                 );
//                 break;
//             default:
//                 break;
//         }
//         return view;
//     };

//     return loadArtScene();
// };

// export default ArtWork;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: StatusBar.currentHeight,
//     },
//     scrollView: {
//         marginHorizontal: 20,
//     },
//     borderContainer: {
//         backgroundColor: 'rgba(0, 0, 0, 0.3)',
//         borderColor: 'rgba(255, 255, 255, 1)',
//         borderWidth: 2,
//     },
//     scrollIndicator: {
//         position: 'absolute',
//         right: 5,
//         width: 5,
//         height: 50, // Adjust based on desired size
//         backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust color as needed
//         borderRadius: 2.5,
//     },
// });
