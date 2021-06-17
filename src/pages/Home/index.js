import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  // TextInput,
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  BannerAds,
  FoodCard,
  FoodList,
  FoodListItem,
  Gap,
  Header,
  Rating,
  TextInput,
} from '../../components';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Constant from '../../config/Constant';

import {BASE_URL} from '../../utilities';
import {IconFavActive, IconFav, IconClose} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRecipesData,
  searchRecipes,
  addToFavorite,
  removeFromFavorite,
  filterData,
} from '../../redux/action';

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const dispatch = useDispatch();
  const {recipes, favorite} = useSelector(state => state.homeReducer);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  // const getResep = () => {
  //   axios
  //     .get('https://dromedia.co/app/kebab.json')
  //     .then(res => {
  //       setFilterData(res.data);
  //       setResep(res.data);
  //     })
  //     .catch(err => {});
  // };
  useEffect(() => {
    dispatch(getRecipesData());
    dispatch(searchRecipes());
  }, [dispatch]);

  const searchFilter = text => {
    if (text) {
      const newData = recipes.filter(item => {
        const itemData = item.judul.toLowerCase();
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(recipes);
      setSearch(text);
    }
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const onTapAddToFavorite = recipe => {
    addToFavorite(recipe);
  };

  const onTapRemoveFromFavorite = recipe => {
    removeFromFavorite(recipe);
  };

  const isExist = recipe => {
    if (favorite.filter(item => item.id === recipe.id).length > 0) {
      return true;
    }
    return false;
  };

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
          <Text style={styles.title}>Top Recipes</Text>
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
          <TextInput
            placeholder="Search Recipes"
            onChangeText={text => searchFilterFunction(text)}
          />
          <Gap height={20} />
          <BannerAds />
          <Gap height={20} />
          {recipes.map(item => {
            return (
              <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => navigation.navigate('Detail', item)}>
                    <Image
                      source={{uri: item.image}}
                      style={{width: 40, height: 40}}
                    />
                    <View style={styles.itemRecipes}>
                      <Text style={styles.textItem}>{item.judul}</Text>
                      <Rating number={item.rating} />
                    </View>
                  </TouchableOpacity>
                </View>
                {isExist(item) ? (
                  <TouchableOpacity
                    onPress={() => onTapRemoveFromFavorite(item)}
                    style={{
                      flex: 1,
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={IconFavActive}
                      style={{width: 30, height: 30}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => onTapAddToFavorite(item)}
                    style={{
                      flex: 1,
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                    }}>
                    <Image source={IconFav} style={{width: 30, height: 30}} />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
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
});
