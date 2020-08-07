import React, { useState, useEffect, ChangeEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
  const [teacherListForm, setTeacherListForm] = useState({
    subject: '',
    weekDay: '',
    time: '',
  });
  const [teachers, setTeachers] = useState([]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setTeacherListForm({
      ...teacherListForm,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setTeacherListForm({
      ...teacherListForm,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
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
    }
  }, [teacherListForm]);

  return (
    <div className="container" id="page-teacher-list">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            onChange={handleSelectChange}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografica', label: 'Geografica' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />

          <Select
            name="weekDay"
            label="Dia da semana"
            onChange={handleSelectChange}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input
            label="Hora"
            name="time"
            type="time"
            onChange={handleInputChange}
          />
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            id={teacher.id}
            subject={teacher.subject}
            cost={teacher.cost}
            user_id={teacher.user_id}
            name={teacher.name}
            avatar={teacher.avatar}
            whatsapp={teacher.whatsapp}
            bio={teacher.bio}
          />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
