import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header} from '../../components';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Welcome" subTitle="Halo" onBack />
      <View style={styles.container}>
        <Gap height={20} />
        <Button
          text="Selamat datang"
          onPress={() => navigation.navigate('MainApp')}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 26,
    marginTop: 24,
    backgroundColor: 'white',
    flex: 1,
  },
});
