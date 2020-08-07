import React from 'react';

import api from '../../services/api';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

const TeacherItem: React.FC<Teacher> = ({
  id,
  subject,
  cost,
  user_id,
  name,
  avatar,
  whatsapp,
  bio,
}) => {
  const createNewConnection = () => {
    api.post('/connections', {
      user_id: id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ {cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${whatsapp}`}
          target="_black"
        >
          <img src={whatsAppIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
