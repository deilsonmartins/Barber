import React from 'react';

import { Link } from 'react-router-dom';

import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

import { useDispatch } from 'react-redux';

import { signUpRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logosvg.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('Emal invalido').required('Email obrigatório'),
  password: Yup.string().required('A senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu Email" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar Conta</button>

        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
