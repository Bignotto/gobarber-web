import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Container, Content, Background } from "./styles";

import logo from "../../assets/logo.svg";

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="LOGO" />
      <form>
        <h1>Faça seu logon</h1>
        <input type="email" placeholder="E-Mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <a href="forgot">Esqueci minha senha.</a>
      </form>

      <a href="">
        <FiLogIn size={16} />
        Criar uma nova conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
