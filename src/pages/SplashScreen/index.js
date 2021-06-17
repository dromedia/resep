import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Logo} from '../../assets';
import {Gap} from '../../components';
import Constant from '../../config/Constant';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
  }, []);

  return (
    <View style={styles.page}>
      <Logo />
      <Gap height={20} />
      <Text style={styles.title}>Resep Makanan</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: Constant.COLOR.Primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: Constant.COLOR.Black,
    fontFamily: 'Poppins-Medium',
  },
});
