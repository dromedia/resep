import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {Gap, Rating, Header} from '../../components';
import {removeKey} from '../../utilities/storage';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const FavoriteScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const removeData = () => {
    removeKey('recipe_fav');
  };
  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    getFavorites();
  }, [favorites]);

  const renderFavorites = ({item}) => {
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
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return <View />;
  };

  return (
    <View style={styles.page}>
      <Header
        color="black"
        title="Liked Recipes"
        subTitle="All the best Recipes you liked"
      />
      <View style={styles.container}>
        <Gap height={20} />
        <FlatList
          data={favorites}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderFavorites}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <TouchableOpacity onPress={() => removeData()}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteScreen;

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
