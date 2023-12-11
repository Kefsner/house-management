import React from 'react';

import './AuthForm.css';

function InputForm(props) {
  return (
    <>
        <label htmlFor={props.id}>{props.label}</label>
        <input
            type={props.type}
            id={props.id}
            autoComplete={props.autoComplete}
            value={props.value}
            onChange={props.onChange}
            autoFocus={props.autoFocus}
        />
    </>
  );
}

function AuthForm(props) {
  const toogleForm = () => {
    props.setIsRegister(!props.isRegister);
  };

  return (
    <form onSubmit={props.handleSubmit}>
      <InputForm
        type="text"
        id="username"
        autoComplete="username"
        value={props.data.username}
        onChange={(event) => props.setUsername(event.target.value)}
        autoFocus={true}
        label="Usuário"
      />
      <InputForm
        type="password"
        id="password"
        autoComplete="off"
        value={props.data.password}
        onChange={(event) => props.setPassword(event.target.value)}
        label="Senha"
      />
      {props.isRegister && (
        <InputForm
          type="password"
          id="confirmPassword"
          autoComplete="off"
          value={props.data.confirmPassword}
          onChange={(event) => props.setConfirmPassword(event.target.value)}
          label="Confirmar senha"
        />
      )}
      <button type="submit" className="button-form">
        {props.isRegister ? "Criar conta" : "Entrar"}
      </button>
      <button type="button" onClick={toogleForm} className="button-form">
        {props.isRegister ? "Voltar" : "Criar conta"}
      </button>
    </form>
  );
}

export default AuthForm;