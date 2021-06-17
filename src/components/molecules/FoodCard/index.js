import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {Rating} from '..';
import {FoodDummy1, IconStarOff, IconStarOn} from '../../../assets';

const FoodCard = ({image, name, rating, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.text}>{name}</Text>
          <Rating number={rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    overflow: 'hidden',
    marginRight: 24,
    // marginVertical: 24,
    marginTop: 15,
    width: 250,
  },
  rating: {
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },

  content: {
    padding: 12,
  },
  image: {
    width: 250,
    height: 80,
    resizeMode: 'cover',
  },
});
