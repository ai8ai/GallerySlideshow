import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import AlbumSlideshow from '@/components/AlbumSlideshow';

const AboutScreen = () => {
    const params = useLocalSearchParams();
    const selectedAlbum = JSON.parse(params.selectedAlbum as string);

    return <AlbumSlideshow album={selectedAlbum} />;
};

export default AboutScreen;