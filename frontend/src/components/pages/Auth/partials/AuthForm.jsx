import React from 'react';

import Input from '../../../common/Input';
import Message from '../../../common/Message';
import Button from '../../../common/Button';

import './AuthForm.css';

export default function AuthForm(props) {
  const toogleForm = () => {
    props.setIsRegister(!props.isRegister);
    props.setMessage("");
    props.setPassword("");
  };

  return (
    <form onSubmit={props.handleSubmit} className="auth-form-container">
      <Input
        type="text"
        id="username"
        autoComplete="username"
        value={props.data.username}
        onChange={(event) => props.setUsername(event.target.value)}
        autoFocus={true}
        label="Usuário"
        required={true}
        minLength={3}
        maxLength={20}
        className="auth-form-input"
      />
      <Input
        type="password"
        id="password"
        autoComplete="off"
        value={props.data.password}
        onChange={(event) => props.setPassword(event.target.value)}
        label="Senha"
        required={true}
        minLength={6}
        maxLength={30}
        className="auth-form-input"
      />
      {props.isRegister && (
        <Input
          type="password"
          id="confirmPassword"
          autoComplete="off"
          value={props.data.confirmPassword}
          onChange={(event) => props.setConfirmPassword(event.target.value)}
          label="Confirmar senha"
          required={true}
          minLength={6}
          maxLength={30}
          className="auth-form-input"
        />
      )}
      {(props.message.success || props.message.error) && (
        <Message
          message={props.message.success || props.message.error}
          success={Boolean(props.message.success)}
          className="auth-form-message"
        />
      )}
      <Button type="submit" className="auth-form-button">
        {props.isRegister ? "Criar conta" : "Entrar"}
      </Button>
      <Button type="button" onClick={toogleForm} className="auth-form-button">
        {props.isRegister ? "Voltar" : "Criar conta"}
      </Button>
    </form>
  );
}