import { useState } from 'react';

const useModalActions = (images: string[], currentIndex: number, setImages: (images: string[]) => void) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isIntervalInputVisible, setIsIntervalInputVisible] = useState(false);

    const handleDeleteImage = () => {
        const updatedImages = [...images];
        updatedImages.splice(currentIndex, 1);
        setImages(updatedImages);
        setModalVisible(false);
    };

    const handleChangeInterval = () => {
        setIsIntervalInputVisible(true); // Show the text input
    };

    const handleHelp = () => {
        console.log('Help clicked');
        setModalVisible(false);
    };

    const modalOptions = [
        { label: 'Change Interval', onPress: handleChangeInterval },
        { label: 'Delete Current Image', onPress: handleDeleteImage },
        { label: 'Help', onPress: handleHelp },
    ];

    return {
        modalVisible,
        setModalVisible,
        isIntervalInputVisible,
        setIsIntervalInputVisible,
        modalOptions,
    };
};

export default useModalActions;