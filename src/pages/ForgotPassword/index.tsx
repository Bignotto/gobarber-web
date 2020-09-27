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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { removeToast, addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-Mail é obrigatório!")
            .email("Informe um e-mail válido."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // history.push("/dashboard");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        //disparar toast
        addToast({
          type: "error",
          title: "Erro na recuperação de senha",
          description:
            "Ocorreu um erro ao tentar recuperar a senha. Tente novamente.",
        });
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="LOGO" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-Mail"
            />
            <Button type="submit">Recuperar</Button>
          </Form>

          <Link to="/">
            <FiLogIn size={16} />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
