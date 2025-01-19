import React from 'react';
import { Modal, TextInput, StyleSheet } from 'react-native';
import CustomModal from '@/components/CustomModal';

interface ImageOptionsModalProps {
    visible: boolean;
    onClose: () => void;
    isIntervalInputVisible: boolean;
    savedIntervalValue: string | undefined;
    handleIntervalChange: (text: string) => void;
    modalOptions: { label: string; onPress: () => void }[];
}

const ImageOptionsModal: React.FC<ImageOptionsModalProps> = ({
    visible,
    onClose,
    isIntervalInputVisible,
    savedIntervalValue,
    handleIntervalChange,
    modalOptions,
}) => {
    return (
        <CustomModal
            visible={visible}
            onClose={onClose}
            options={!isIntervalInputVisible ? modalOptions : []}
        >
            {isIntervalInputVisible && (
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Interval (ms)"
                    keyboardType="numeric"
                    value={savedIntervalValue}
                    onChangeText={handleIntervalChange}
                />
            )}
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default ImageOptionsModal;