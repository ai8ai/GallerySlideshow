import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Animated, Pressable, StyleSheet, TextInput, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import useSlideshowInterval from '@/hooks/useSlideshowInterval';
import useImageAnimation from '@/hooks/useImageAnimation';
import CustomModal from '@/components/CustomModal';

const DEFAULT_INTERVAL = 5000;

const AlbumSlideshow: React.FC<{ album: MediaLibrary.Album }> = ({ album }) => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentIndex, updateIntervalTime, intervalTime } = useSlideshowInterval(images, DEFAULT_INTERVAL);
    const { scaleAnim, animationType, animateImageChange, randomizeAnimationType } = useImageAnimation();
    const [modalVisible, setModalVisible] = useState(false);
    const [isIntervalInputVisible, setIsIntervalInputVisible] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const assets = await MediaLibrary.getAssetsAsync({
                    album,
                    mediaType: MediaLibrary.MediaType.photo,
                });
                setImages(assets.assets.map((asset) => asset.uri));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [album]);

    const handleImagePress = () => {
        setModalVisible(true);
    };

    const handleIntervalChange = (text: string) => {
        const newInterval = parseInt(text, 10);
        if (!isNaN(newInterval)) {
            updateIntervalTime(newInterval);
        }
    };

    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#000" />;
    }

    return (
        <View style={styles.imageContainer}>
            <Animated.View style={[styles.image, { transform: [{ scale: scaleAnim }] }]}>
                <Pressable onPress={handleImagePress}>
                    <Animated.Image source={{ uri: images[currentIndex] }} style={styles.image} />
                </Pressable>
            </Animated.View>
            <CustomModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setIsIntervalInputVisible(false);
                }}
            >
                {isIntervalInputVisible ? (
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter Interval (ms)"
                        keyboardType="numeric"
                        value={intervalTime.toString()}
                        onChangeText={handleIntervalChange}
                    />
                ) : (
                    <>
                        <Pressable onPress={() => setIsIntervalInputVisible(true)}>
                            <Text style={styles.modalOption}>Change Interval</Text>
                        </Pressable>
                        <Pressable onPress={() => console.log('Delete Current Image')}>
                            <Text style={styles.modalOption}>Delete Current Image</Text>
                        </Pressable>
                        <Pressable onPress={() => console.log('Help')}>
                            <Text style={styles.modalOption}>Help</Text>
                        </Pressable>
                    </>
                )}
            </CustomModal>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    modalOption: {
        fontSize: 16,
        padding: 10,
        textAlign: 'center',
    },
});

export default AlbumSlideshow;
