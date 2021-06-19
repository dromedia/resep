import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Logo} from '../../assets';
import {Gap} from '../../components';
import Constant from '../../config/Constant';

const SplashScreen = ({navigation}) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('alreadyLaunched').then(value => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
          navigation.navigate('Gdpr');
        } else {
          setIsFirstLaunch(false);
          navigation.replace('MainApp');
        }
      });
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
