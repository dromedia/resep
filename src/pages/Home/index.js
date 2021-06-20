import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BannerAds, FoodCard, Gap, Header} from '../../components';
import Constant from '../../config/Constant';
import {getRecipesData} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {recipes} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getRecipesData());
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          color="black"
          title="Kebab Recipes"
          subTitle="101 Kebab Recipes"
        />
        <View style={styles.container}>
          <Gap height={20} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Top Recipes</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.cardContainer}>
              {recipes
                .filter(item => item.rating >= 2)
                .map(item => {
                  return (
                    <FoodCard
                      key={item.id}
                      name={item.judul}
                      image={{uri: item.image}}
                      rating={item.rating}
                      onPress={() => navigation.navigate('Detail', item)}
                    />
                  );
                })}
            </View>
          </ScrollView>

          <Gap height={20} />
          <BannerAds />
          <Gap height={20} />
        </View>
        <Gap height={30} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    paddingLeft: 20,
    elevation: 10,
  },

  textItem: {
    fontFamily: 'Poppins-Medium',
    color: Constant.COLOR.Black,
  },
  image: {
    width: 60,
    height: 60,
  },
  itemRecipes: {
    paddingLeft: 5,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
