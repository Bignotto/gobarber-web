import React, { useRef, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Container, Content, Background, AnimationContainer } from "./styles";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { getValidationErrors } from "../../utils/getValidationErrors";

import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";

import logo from "../../assets/logo.svg";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-Mail é obrigatório!")
            .email("Informe um e-mail válido."),
          password: Yup.string().min(6, "Senha precisa ter 6 dígitos."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });

        history.push("/dashboard");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        //disparar toast
        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Verifique seu usuário e senha e tente novamente.",
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="LOGO" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-Mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha.</Link>
          </Form>

          <Link to="signup">
            <FiLogIn size={16} />
            Criar uma nova conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
