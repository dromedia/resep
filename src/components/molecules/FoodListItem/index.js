import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Rating} from '..';
import {IconFav, IconNext} from '../../../assets';
import Constant from '../../../config/Constant';
import {Gap} from '../../atoms';

const FoodListItem = ({name, image, rating, onPress}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.text}>{name}</Text>
          <Gap height={10} />
          <Rating number={rating} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FoodListItem;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'white',
    marginVertical: 4,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
  containerFav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 4,
  },
  buttonFav: {
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
  },
  content: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: Constant.COLOR.Gray,
  },
});
