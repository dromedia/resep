import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const IngredientCard = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>• {data}</Text>
    </View>
  );
};

export default IngredientCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D92A3',
    paddingHorizontal: 20,
  },
});
