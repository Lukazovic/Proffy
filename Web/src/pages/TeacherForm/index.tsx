import React, { useState, FormEvent, ChangeEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

const TeacherForm: React.FC = () => {
  const [teacherFormInputs, setTeacherFormInputs] = useState({
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: '',
  });
  const [scheduleItems, setScheduleItems] = useState([
    { weekDay: 0, from: '', to: '' },
  ]);

  const { name, avatar, whatsapp, bio, subject, cost } = teacherFormInputs;

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { weekDay: 0, from: '', to: '' }]);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setTeacherFormInputs({
      ...teacherFormInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setTeacherFormInputs({
      ...teacherFormInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setTeacherFormInputs({
      ...teacherFormInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const setScheduleItemValue = (
    scheduleItemIndex: number,
    field: string,
    value: string
  ) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === scheduleItemIndex) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  };

  const handleCreateClass = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await api.post('classes', {
        ...teacherFormInputs,
        cost: Number(cost),
        schedule: scheduleItems.map(scheduleItems => ({
          week_day: scheduleItems.weekDay,
          from: scheduleItems.from,
          to: scheduleItems.to,
        })),
      });

      alert('Cadastro realizado com sucesso!');
    } catch (err) {
      alert('Erro no cadastro!');
    }
  };

  return (
    <div className="container" id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form action="submit" onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={handleInputChange}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={handleInputChange}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={handleInputChange}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={handleTextareaChange}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre as aulas</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
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
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponível
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={index} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.weekDay}
                  onChange={evt =>
                    setScheduleItemValue(index, 'weekDay', evt.target.value)
                  }
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
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={evt =>
                    setScheduleItemValue(index, 'from', evt.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={evt =>
                    setScheduleItemValue(index, 'to', evt.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
