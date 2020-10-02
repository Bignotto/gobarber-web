import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from "react-icons/fi";
import { getValidationErrors } from "../../utils/getValidationErrors";
import api from "../../services/api";
import * as Yup from "yup";

import { Link, useHistory } from "react-router-dom";
import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, AvatarInput } from "./styles";

interface ProfileFormData {
  name: string;
  email: string;
  passwrod: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <Button>
              <FiCamera />
            </Button>
          </AvatarInput>

          <h1>Meu perfil</h1>
          <Input
            name="name"
            icon={FiUser}
            type="text"
            placeholder="Nome completo"
          />

          <Input name="email" icon={FiMail} type="text" placeholder="E-Mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
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
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar alterações</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
