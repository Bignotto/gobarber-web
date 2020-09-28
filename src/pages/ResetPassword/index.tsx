import React, { useRef, useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { Container, Content, Background, AnimationContainer } from "./styles";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { getValidationErrors } from "../../utils/getValidationErrors";

import { useToast } from "../../hooks/toast";

import logo from "../../assets/logo.svg";
import api from "../../services/api";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória!"),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password")],
            "Senhas não batem!"
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace("?token=", "");
        if (!token) throw new Error();

        await api.post("/password/reset", {
          password,
          password_confirmation,
          token,
        });

        history.push("/");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          //disparar toast
          addToast({
            type: "error",
            title: "Erro ao resetar senha.",
            description:
              "Ocorreu um erro ao resetar sua senha, tente novamente.",
          });
        }
      }
    },
    [addToast, history, location]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="LOGO" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />
            <Button type="submit">Salvar nova senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
