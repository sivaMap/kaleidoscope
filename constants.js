import AsyncStorage from '@react-native-async-storage/async-storage';

exports.constants = {
    loadScreen: { curate: "CuratedShow", art: "ArtShow", default: "Home" },
    loadCurate: { show: "CuratedShows", play: "CuratedPlay" },
    loadArt: { show: "ArtShows", play: "ArtPlay" },
    ipAddress: "0.0.0.0",
    port: "5001",
    get backendUrl() {
        return `http://${this.ipAddress}:${this.port}`;
    },
    get backendIp() {
        return `http://${this.ipAddress}`;
    }
}

exports.updateConstants = async () => {
    const ipAddress = await AsyncStorage.getItem('ipAddress') || '0.0.0.0' ;    
    const port = await AsyncStorage.getItem('port') || "5001";

    exports.constants.ipAddress = ipAddress;
    exports.constants.port = port;
};