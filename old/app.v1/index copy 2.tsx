import styles from '@/styles/styles';
import React, { useState, useEffect } from 'react';
import {View,FlatList,Image,Text,TouchableOpacity,Alert,PermissionsAndroid,Platform,} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Define the extended Album type
interface AlbumWithCover extends MediaLibrary.Album {
    cover: string | null;
}

const Drawer = createDrawerNavigator();

function MainGallery() {
    const [albums, setAlbums] = useState<AlbumWithCover[]>([]); // Explicitly use AlbumWithCover[]
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            try {
                // Request only photo permissions on Android
                let permission;
                const androidVersion = typeof Platform.Version === 'string' ? parseInt(Platform.Version, 10) : Platform.Version;

                if (androidVersion >= 33) {
                    // Android 13+ requires READ_MEDIA_IMAGES
                    permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
                } else {
                    // Android <13 requires READ_EXTERNAL_STORAGE
                    permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
                }

                const granted = await PermissionsAndroid.request(permission, {
                    title: 'Photo Permission',
                    message: 'This app needs access to your photos to show albums.',
                    buttonPositive: 'Allow',
                });

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionGranted(true);
                    await fetchAlbums();
                } else {
                    Alert.alert('Permission Denied', 'We need access to your photos to show albums.');
                }
            } catch (err) {
                console.error('Failed to request permission:', err);
            }
        };

        const fetchAlbums = async () => {
            const albumsList = await MediaLibrary.getAlbumsAsync();
            const albumsWithCovers: AlbumWithCover[] = await Promise.all(
                albumsList.map(async (album) => {
                    const assets = await MediaLibrary.getAssetsAsync({
                        album: album,
                        first: 1,
                        mediaType: MediaLibrary.MediaType.photo,
                    });
                    return {
                        ...album,
                        cover: assets.assets[0]?.uri || null, // Get first image URI or null
                    };
                })
            );
            setAlbums(albumsWithCovers); // Update state with the correct type
        };

        getPermissions();
    }, []);

    const handleAlbumPress = (album: AlbumWithCover) => {
        router.push({
            pathname: '/about',
            params: { selectedAlbum: JSON.stringify(album) },
        });
    };

    const renderAlbum = ({ item }: { item: AlbumWithCover }) => (
        <TouchableOpacity style={styles.albumContainer} onPress={() => handleAlbumPress(item)}>
            <Image
                source={item.cover ? { uri: item.cover } : require('@/assets/images/placeholder.png')}
                style={styles.albumCover}
            />
            <Text style={styles.albumTitle} numberOfLines={1}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {permissionGranted ? (
                <FlatList
                    data={albums}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAlbum}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                />
            ) : (
                <Text style={styles.permissionText}>Permission required to access photos.</Text>
            )}
        </View>
    );
}

function RateTheApp() {
    return (
        <View style={styles.container}>
            <Text style={styles.permissionText}>coming soon!</Text>
        </View>
    );
}

export default function GalleryAlbums() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    width: 250,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
            }}
        >
            <Drawer.Screen name="Gallery" component={MainGallery} options={{ title: 'My Gallery' }} />
            <Drawer.Screen name="Rate" component={RateTheApp} options={{ title: '5 star!' }} />
        </Drawer.Navigator>
    );
}