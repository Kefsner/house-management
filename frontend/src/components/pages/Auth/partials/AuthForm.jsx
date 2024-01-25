import React from "react";

import Message from "./Message";

import "./AuthForm.css";

export default function AuthForm(props) {
  const toogleForm = () => {
    props.setIsRegister(!props.isRegister);
    props.setMessage("");
    props.setPassword("");
  };

  return (
    <form onSubmit={props.handleSubmit} className="auth-form">
      <label htmlFor="username">Usuário</label>
      <input
        type="text"
        id="username"
        value={props.data.username}
        onChange={(event) => props.setUsername(event.target.value)}
        autoFocus={true}
        required={true}
        minLength={3}
        maxLength={20}
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={props.data.password}
        onChange={(event) => props.setPassword(event.target.value)}
        required={true}
        minLength={6}
        maxLength={30}
      />
      {props.isRegister && (
        <>
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={props.data.confirmPassword}
            onChange={(event) => props.setConfirmPassword(event.target.value)}
            required={true}
            minLength={6}
            maxLength={30}
          />
        </>
      )}
      {(props.message.success || props.message.error) && (
        <Message
          message={props.message.success || props.message.error}
          success={Boolean(props.message.success)}
          className="message"
        />
      )}
      <button type="submit">
        {props.isRegister ? "Criar conta" : "Entrar"}
      </button>
      <button type="button" onClick={toogleForm}>
        {props.isRegister ? "Voltar" : "Criar conta"}
      </button>
    </form>
  );
}
