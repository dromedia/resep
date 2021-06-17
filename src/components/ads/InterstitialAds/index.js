import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from '@react-native-firebase/admob';
import {Button} from '../../atoms';
import Constant from '../../../config/Constant';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function AppButton({text}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
      if (type === AdEventType.CLOSED) {
        console.log('Ads Closed');
        setLoaded(false);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      text={text}
      onPress={() => {
        interstitial.show();
      }}
    />
  );
}

const InterstitialAds = ({text}) => {
  return (
    <View>
      <AppButton text={text} />
    </View>
  );
};

export default InterstitialAds;

const styles = StyleSheet.create({});
