import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, ModalCard} from '../../components';

const Instruction = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Gap height={10} />
        <ModalCard />
      </View>
    </View>
  );
};

export default Instruction;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
  },
});
