import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favoritedTeachers, setFavoritedTeachers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteTeacher();
    }, [])
  );

  const fetchFavoriteTeacher = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favorites = JSON.parse(response);

        setFavoritedTeachers(favorites);
      }
    });
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favoritedTeachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
