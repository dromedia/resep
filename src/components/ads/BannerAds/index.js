import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';

const BannerAds = () => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner loaded');
        }}
        onAdFailedToLoad={error => {
          console.error('Banner failed to load: ', error);
        }}
      />
    </View>
  );
};

export default BannerAds;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
