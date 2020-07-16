import React from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Container, Content, Background } from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../assets/logo.svg";

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="LOGO" />
      <form>
        <h1>Faça seu logon</h1>
        <Input name="email" icon={FiMail} type="email" placeholder="E-Mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
        <a href="forgot">Esqueci minha senha.</a>
      </form>

      <a href="sss">
        <FiLogIn size={16} />
        Criar uma nova conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
