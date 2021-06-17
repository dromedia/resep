import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from '@react-native-firebase/admob';
import {Button} from '../../atoms';
import {SlideModal} from 'react-native-slide-modal';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

// const adUnitId = 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function ButtonModal() {
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
      if (type === AdEventType.CLOSED) {
        console.log('Ads Closed');
        setModalVisible(!modalVisible);
        setLoaded(false);
      }
      if (type === AdEventType.ERROR) {
        // setModalVisible(!modalVisible);
        console.log('Error');
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
    return (
      <SlideModal
        modalType="iOS Form Sheet"
        modalVisible={modalVisible}
        screenContainer={
          <>
            <Button
              text="No ads"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </>
        }
        modalContainer={
          <>
            <Text>Modal Content</Text>
          </>
        }
        modalHeaderTitle="header title"
        pressDone={() => setModalVisible(!modalVisible)}
        pressCancel={() => setModalVisible(!modalVisible)}
        darkMode={false}
        doneDisabled={false}
      />
    );
  }

  return (
    <SlideModal
      modalType="iOS Form Sheet"
      modalVisible={modalVisible}
      screenContainer={
        <>
          <Button
            text="show modal with ads"
            onPress={() => interstitial.show()}
          />
        </>
      }
      modalContainer={
        <>
          <Text>Modal Content</Text>
        </>
      }
      modalHeaderTitle="header title"
      pressDone={() => setModalVisible(!modalVisible)}
      pressCancel={() => setModalVisible(!modalVisible)}
      darkMode={false}
      doneDisabled={false}
    />
  );
}

const ModalCard = ({data}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Text>{data}</Text>
      <ButtonModal />
    </View>
  );
};

export default ModalCard;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
