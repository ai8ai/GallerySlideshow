import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_INTERVAL = 5000;

// Function to get the saved interval time or set it to the default
const getSavedIntervalTime = async (): Promise<number> => {
    try {
        const storedInterval = await AsyncStorage.getItem('intervalTime');
        if (storedInterval) {
            return parseInt(storedInterval, 10);
        } else {
            // Save the default interval if none exists
            await AsyncStorage.setItem('intervalTime', DEFAULT_INTERVAL.toString());
            return DEFAULT_INTERVAL;
        }
    } catch (error) {
        console.error('Error fetching interval time:', error);
        return DEFAULT_INTERVAL; // Return default in case of error
    }
};

export default getSavedIntervalTime;
