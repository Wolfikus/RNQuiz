import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default ({ children, style }) => (
    <Text style={[styles.text, style]}>{children}</Text>
)

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 17,
    }
});