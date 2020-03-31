import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Container, Content, Profile } from './styles';

import logo from '../../assets/logo-purple.svg';

import Notifications from '../Notifications';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  const avatar_url = useSelector((state) => state.user.avatar_url).replace(
    /"/g,
    ''
  );

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Barber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.nome}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                avatar_url ||
                'https://api.adorable.io/avatars/48/abott@adorable.png'
              }
              alt="Deilson martins"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
