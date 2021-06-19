import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {IconFav, IconFavActive} from '../../assets';
import {Gap, Header, Rating} from '../../components';

const FoodScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();

  const getRecipes = async () => {
    await axios
      .get('https://dromedia.co/app/kebab.json')
      .then(res => {
        setRecipes(res.data);
        setMasterData(res.data);
        dispatch({type: 'SET_LOADING', value: false});
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        Alert.alert('Ups...', err);
      });
  };

  useEffect(() => {
    dispatch({type: 'SET_LOADING', value: true});
    getRecipes();
    setTimeout(() => {
      getFavorites();
    }, 1000);
  }, []);

  const getFavorites = async () => {
    try {
      const recipeFavorites = await AsyncStorage.getItem('recipe_fav');
      if (recipeFavorites !== null) {
        setFavorites(JSON.parse(recipeFavorites));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', item)}
          activeOpacity={0.7}
          style={styles.containerFood}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.text}>{item.judul}</Text>
            <Gap height={10} />
            <Rating number={item.rating} />
          </View>
        </TouchableOpacity>
        <View style={styles.containerFav}>
          {isExist(item) ? (
            <TouchableOpacity
              onPress={() => removeFavoriteRecipe(item)}
              activeOpacity={0.7}
              style={styles.buttonFav}>
              <Image source={IconFavActive} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => addFavoriteRecipe(item)}
              activeOpacity={0.7}
              style={styles.buttonFav}>
              <Image source={IconFav} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return <View />;
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setRecipes(newData);
      setSearch(text);
    } else {
      setRecipes(masterData);
      setSearch(text);
    }
  };

  const saveStorage = async items => {
    try {
      await AsyncStorage.setItem('recipe_fav', JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteRecipe = recipe => {
    const newFavoriteList = [...favorites, recipe];
    setFavorites(newFavoriteList);
    saveStorage(newFavoriteList);
    Alert.alert('You Liked...', recipe.judul);
  };

  const removeFavoriteRecipe = recipe => {
    const newFavoriteList = favorites.filter(
      favorite => favorite.judul !== recipe.judul,
    );
    setFavorites(newFavoriteList);
    saveStorage(newFavoriteList);
  };

  const isExist = recipe => {
    if (favorites.filter(item => item.id === recipe.id).length > 0) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.page}>
      <Header
        color="black"
        title="All Recipes"
        subTitle="Highest Rated Recipes"
      />
      <Gap height={20} />
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          searchIcon={{size: 24}}
          onChangeText={text => searchFilter(text)}
          placeholder="Search Recipes..."
          value={search}
          containerStyle={{backgroundColor: 'white', borderRadius: 10}}
          inputContainerStyle={{
            backgroundColor: 'white',
          }}
          inputStyle={{fontFamily: 'Poppins-Regular'}}
        />
        <Gap height={20} />
        <FlatList
          data={recipes}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Gap height={20} />
    </View>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  textInputStyle: {
    borderWidth: 0,
    color: 'gray',
    fontFamily: 'Poppins-Regular',
    padding: 10,
    backgroundColor: 'white',
    elevation: 0,
    borderRadius: 10,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  containerFood: {
    flex: 5,
    backgroundColor: 'white',
    marginVertical: 4,
    flexDirection: 'row',
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  containerFav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 4,
  },
  image: {
    width: 60,
    height: 60,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: 'gray',
  },
  content: {
    justifyContent: 'center',
    marginLeft: 10,
  },
});
