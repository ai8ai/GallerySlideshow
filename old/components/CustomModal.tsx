import styles from '@/styles/styles'
import React from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    options?: { label: string; onPress: () => void }[];
    children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, options, children }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {children ? (
                        children // Render the children if provided
                    ) : (
                        options?.map((option, index) => {
                            switch (index) {
                                case 0: // Treat modalOptions[0] as a TextInput with labels
                                    return (
                                        <View key={index} style={styles.inputRow}>
                                            <Text style={styles.label}>Interval:</Text>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder={option.label}
                                                value={option.value} // Controlled value for TextInput
                                                onChangeText={option.onInputChange} // Handle text changes
                                                keyboardType="numeric" // Optional: Use numeric keyboard
                                            />
                                            <Text style={styles.label}>seconds</Text>
                                        </View>
                                    );
                                case 1: // Treat modalOptions[1] as a button
                                case 2: // Treat modalOptions[2] as a button
                                default:
                                    return (
                                        <Pressable
                                            key={index}
                                            style={styles.optionButton}
                                            onPress={option.onPress}
                                        >
                                            <Text style={styles.optionText}>{option.label}</Text>
                                        </Pressable>
                                    );
                            }
                        })
                    )}
                </View>
            </View>
        </Modal>
    );
};



export default CustomModal;
