import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constant from '../../../config/Constant';

const InstructionCard = ({nomer, data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>• {data}</Text>
    </View>
  );
};

export default InstructionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D92A3',
    paddingHorizontal: 20,
    color: Constant.COLOR.Black,
  },
});
