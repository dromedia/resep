import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap, Rating} from '../../components';
import {removeKey} from '../../utilities/storage';

const About = () => {
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
    <View>
      <TouchableOpacity onPress={() => removeData()}>
        <Text>Remove</Text>
      </TouchableOpacity>
      <FlatList
        data={favorites}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={renderFavorites}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
