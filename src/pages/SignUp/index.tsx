import React from "react";
import { Form } from "@unform/web";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Container, Content, Background } from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../assets/logo.svg";

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }
  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="LOGO" />
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input
            name="name"
            icon={FiUser}
            type="text"
            placeholder="Nome completo"
          />

          <Input name="email" icon={FiMail} type="email" placeholder="E-Mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="sss">
          <FiArrowLeft size={16} />
          Voltar para logon.
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
