import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const ItemFoodList = ({
  data,
  keyExtractor,
  ItemSeparatorComponent,
  enableEmptySections,
  renderItem,
  ListFooterComponent,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      enableEmptySections={enableEmptySections}
      renderItem={renderItem}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export default ItemFoodList;

const styles = StyleSheet.create({});
