import React from 'react';

import { Form, Input } from '@rocketseat/unform';

import { useDispatch, useSelector } from 'react-redux';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

import { signOut } from '../../store/modules/auth/actions';

import {
  updateProfileRequest,
  updateAvatar,
} from '../../store/modules/user/actions';

export default function Profile() {
  const avatar_url = localStorage.getItem('save_avatar_url');

  const profile = useSelector((state) => state.user.profile);
  const Dispatch = useDispatch();

  function handleSubmit(data) {
    Dispatch(updateProfileRequest(data));
    Dispatch(updateAvatar(avatar_url));
  }

  function handleOut() {
    Dispatch(signOut());
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar" />

        <Input name="nome" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />

        <hr />

        <Input
          name="senhaAntiga"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="novaSenha" type="password" placeholder="Nova senha " />
        <Input
          name="confirmacaoSenha"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Atualizar Perfil</button>
      </Form>

      <button onClick={handleOut} type="button">
        Sair do Barber
      </button>
    </Container>
  );
}
