import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconStarOff, IconStarOn} from '../../../assets';
import Number from '../Number';

const Rating = ({number}) => {
  const renderStar = () => {
    let star = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= number) {
        star.push(<IconStarOn key={i} />);
      } else {
        star.push(<IconStarOff key={i} />);
      }
    }
    return star;
  };
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.rating}>{renderStar()}</View>
      <Number number={number} type="decimal" style={styles.numberRating} />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  numberRating: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    alignItems: 'center',
  },
});
