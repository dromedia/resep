import React from 'react';
import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';
import Constant from '../../../config/Constant';

const TextInput = ({label, placeholder, ...restProps}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Constant.COLOR.Gray,
  },
  input: {
    borderWidth: 0,
    color: Constant.COLOR.Gray,
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
    padding: 10,
    backgroundColor: 'white',
    elevation: 6,
  },
});
