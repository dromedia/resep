import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ItemFoodList = () => {
  return (
    <View style={styles.container}>
      <Text>Item List</Text>
    </View>
  );
};

export default ItemFoodList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
