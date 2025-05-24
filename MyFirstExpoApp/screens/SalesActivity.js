import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SalesActivity() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Follow Ups Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});