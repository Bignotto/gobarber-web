import React, { ChangeEvent, useCallback, useRef } from "react";
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
  old_passwrod: string;
  passwrod: string;
  passwrod_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then(response => {
          updateUser(response.data);
          addToast({
            type: "success",
            title: "Avatar atualizado",
          });
        });
      }
    },
    [addToast, updateUser]
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório!"),
          email: Yup.string()
            .required("E-Mail é obrigatório!")
            .email("Informe um e-mail válido."),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: val => !!val.length,
            then: Yup.string().required("Campo obrigatório!"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: val => !!val.length,
              then: Yup.string().required("Campo obrigatório!"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password")], "Senhas não batem!"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = Object.assign(
          {
            name: data.name,
            email: data.email,
          },
          data.old_passwrod
            ? {
                old_password: data.old_passwrod,
                password: data.passwrod,
                password_confirmation: data.passwrod_confirmation,
              }
            : {}
        );

        const response = await api.put("/profile", formData);
        updateUser(response.data);
        history.push("/");

        addToast({
          type: "success",
          title: "Atualização bem sucedida!",
          description: "Seus dados já foram atualizados!",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        //disparar toast
        addToast({
          type: "error",
          title: "Erro na atualização.",
          description: "Verifique seus dados e tente novamente.",
        });
      }
    },
    [addToast, history, updateUser]
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
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
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
