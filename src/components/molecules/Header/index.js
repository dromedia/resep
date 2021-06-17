import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconBack} from '../../../assets';

const Header = props => {
  const {title, subTitle, onBack} = props;

  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <View style={styles.btnBack}>
            <IconBack />
          </View>
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#020202',
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    fontSize: 14,
    color: '#8D92A3',
    fontFamily: 'Poppins-Light',
  },
  btnBack: {
    padding: 16,
    marginRight: 16,
    marginLeft: -10,
  },
});
