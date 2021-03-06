import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Container, Content, Background, AnimationContainer } from "./styles";
import * as Yup from "yup";
import { getValidationErrors } from "../../utils/getValidationErrors";
import api from "../../services/api";

import { useToast } from "../../hooks/toast";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";

interface SignUpFormData {
  name: string;
  email: string;
  passwrod: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório!"),
          email: Yup.string()
            .required("E-Mail é obrigatório!")
            .email("Informe um e-mail válido."),
          password: Yup.string().min(6, "Senha precisa ter 6 dígitos."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "Você já pode fazer login!",
        });

        history.push("/");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        //disparar toast
        addToast({
          type: "error",
          title: "Erro no cadastro.",
          description: "Verifique seus dados e tente novamente.",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="LOGO" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Nome completo"
            />

            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-Mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft size={16} />
            Voltar para logon.
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
