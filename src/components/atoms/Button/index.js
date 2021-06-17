import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = ({
  text,
  color = '#FFC700',
  textColor = '#020202',
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({
    backgroundColor: color,
    borderRadius: 8,
    padding: 12,
  }),
  text: textColor => ({
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: textColor,
    textAlign: 'center',
  }),
});
