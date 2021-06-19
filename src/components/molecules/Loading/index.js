import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1ABC9C" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Loading ...</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  textContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    marginTop: 20,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});
