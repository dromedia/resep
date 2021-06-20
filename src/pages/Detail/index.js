import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from '@react-native-firebase/admob';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconBackWhite, IconClose, IconFav, IconFavActive} from '../../assets';
import {
  Button,
  Gap,
  IngredientCard,
  InstructionCard,
  Rating,
} from '../../components';
import Constant from '../../config/Constant';

const Detail = ({navigation, route}) => {
  const [favorites, setFavorites] = useState([]);
  const {judul, image, rating, title, ingredient, instruction, content, id} =
    route.params;

  useEffect(async () => {
    cekFavorite();
  }, []);

  const cekFavorite = async () => {
    try {
      const recipeFavorites = await AsyncStorage.getItem('recipe_fav');
      if (recipeFavorites !== null) {
        setFavorites(JSON.parse(recipeFavorites));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isExist = id => {
    if (favorites.filter(favorite => favorite.id === id).length > 0) {
      return true;
    }
    return false;
  };

  const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  // const adUnitId = Constant.ADMOB.IntersUnitID;

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  function ButtonModal() {
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const setIklan = async () => {
      try {
        const value = await AsyncStorage.getItem('play_ad_times');
        if (value !== null) {
          if (value == '4') {
            await AsyncStorage.setItem('play_ad_times', '1');
            // console.log('Iklan Siap ditayangkan');
            interstitial.load();
          } else {
            var temp = parseInt(value) + 1;
            await AsyncStorage.setItem('play_ad_times', temp.toString());
            // console.log(temp);
          }
        } else {
          await AsyncStorage.setItem('play_ad_times', '1');
          interstitial.load();
        }
      } catch (error) {
        await AsyncStorage.setItem('play_ad_times', '1');
      }
    };

    useEffect(() => {
      const eventListener = interstitial.onAdEvent(type => {
        if (type === AdEventType.LOADED) {
          setLoaded(true);
        }
        if (type === AdEventType.CLOSED) {
          setShowModal(!true);
          setLoaded(false);
        }
        if (type === AdEventType.ERROR) {
          console.log('Error');
        }
      });

      setIklan();

      // Unsubscribe from events on unmount
      return () => {
        eventListener();
      };
    }, []);

    // Iklan belum Siap
    if (!loaded) {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onRequestClose={() => console.log('Modal Closed')}>
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <Text style={styles.textModal}>{judul}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(!showModal);
                  }}>
                  <Image
                    source={IconClose}
                    style={{height: 30, width: 30, marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
              <Gap height={12} />
              <ScrollView>
                {instruction.map((itemInstruction, index) => {
                  return (
                    <InstructionCard
                      data={itemInstruction}
                      index={index + 1}
                      key={index}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </Modal>

          <Button
            text="Show Instruction"
            onPress={() => setShowModal(!showModal)}
          />
        </View>
      );
    }

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          onRequestClose={() => console.log('Modal Closed')}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.textModal}>{judul}</Text>
              <TouchableOpacity
                onPress={() => {
                  interstitial.show();
                }}>
                <Image
                  source={IconClose}
                  style={{height: 30, width: 30, marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
            <Gap height={12} />
            <ScrollView>
              {instruction.map((itemInstruction, index) => {
                return (
                  <InstructionCard
                    data={itemInstruction}
                    index={index + 1}
                    key={index}
                  />
                );
              })}
            </ScrollView>
          </View>
        </Modal>

        {/* Button Ads Siap */}
        <Button
          text="Show Instruction"
          onPress={() => setShowModal(!showModal, judul)}
        />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <StatusBar
        barStyle="ligh-content"
        hidden={false}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ImageBackground source={{uri: image}} style={styles.cover}>
        <SafeAreaView>
          <View style={styles.menubar}>
            <View style={styles.backBtn}>
              <TouchableOpacity>
                <IconBackWhite onPress={() => navigation.goBack()} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.title}>
            <Text style={styles.textTitle}>{judul}</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={20} />
          <Text style={styles.content}>{content}</Text>
          <Gap height={30} />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.textIngredients}>Ingredients</Text>
            <View
              style={{
                marginRight: 30,
                backgroundColor: 'transparent',
                padding: 10,
              }}>
              {/* <Rating number={rating} /> */}
              <View style={styles.containerFav}>
                {isExist(id) ? (
                  <View style={styles.buttonFav}>
                    <Image
                      source={IconFavActive}
                      style={{width: 30, height: 30}}
                    />
                  </View>
                ) : (
                  <View style={styles.buttonFav}>
                    <Image source={IconFav} style={{width: 30, height: 30}} />
                  </View>
                )}
              </View>
            </View>
          </View>
          {ingredient.map((itemIngredient, index) => {
            return <IngredientCard key={index} data={itemIngredient} />;
          })}
        </ScrollView>
        <Gap height={20} />
        <ButtonModal />
        <Gap height={20} />
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cover: {
    height: 330,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 26,
    backgroundColor: 'white',
    flex: 1,
  },
  menubar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  ingredientContainer: {
    backgroundColor: 'yellow',
    padding: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    padding: 80,
  },
  textTitle: {
    fontSize: 26,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 2.61,
    textShadowColor: '#000',
  },
  content: {
    fontFamily: 'Poppins-Regular',
    color: Constant.COLOR.Gray,
    textAlign: 'center',
  },
  textIngredients: {
    marginLeft: 30,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: Constant.COLOR.Black,
  },
  modal: {
    flex: 1,
    // padding: 10,
  },
  textModal: {
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Constant.COLOR.Primary,
  },
  instructionContainer: {
    marginTop: 30,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    height: '90%',
    backgroundColor: Constant.COLOR.Primary,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  headerModal: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
