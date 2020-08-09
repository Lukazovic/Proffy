import React, { useState, useEffect, ChangeEvent } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favoritedTeachers, setFavoritedTeachers] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teacherListForm, setTeacherListForm] = useState({
    subject: '',
    weekDay: '',
    time: '',
  });

  const handleToggleFiltersVisible = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const teacherListFormValues = Object.values(teacherListForm);

    const isValidValues = teacherListFormValues.every(value => value !== '');

    if (isValidValues) {
      api
        .get('/classes', {
          params: {
            week_day: teacherListForm.weekDay,
            subject: teacherListForm.subject,
            time: teacherListForm.time,
          },
        })
        .then(response => {
          setTeachers(response.data);
        });

      fetchFavoriteTeacher();
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [teacherListForm]);

  const fetchFavoriteTeacher = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favorites = JSON.parse(response);
        const favoritedTeachersId = favorites.map(
          (teacher: Teacher) => teacher.id
        );

        setFavoritedTeachers(favoritedTeachersId);
      }
    });
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={teacherListForm.subject}
              onChangeText={text =>
                setTeacherListForm({
                  ...teacherListForm,
                  subject: text,
                })
              }
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={teacherListForm.weekDay}
                  onChangeText={text =>
                    setTeacherListForm({
                      ...teacherListForm,
                      weekDay: text,
                    })
                  }
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={teacherListForm.time}
                  onChangeText={text =>
                    setTeacherListForm({
                      ...teacherListForm,
                      time: text,
                    })
                  }
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favoritedTeachers.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
