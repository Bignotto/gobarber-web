import React from "react";
import { FiClock, FiPower } from "react-icons/fi";

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
} from "./styles";

import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo</span> <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados:</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 29</span>
            <span>Terça-Feira</span>
          </p>
          <NextAppointment>
            <strong>Próximo cliente:</strong>
            <div>
              <img
                src="http://localhost:3333/files/b7567d1da852efdbb457-2911353.jpeg"
                alt="Eu!"
              />
              <strong>Thiago Bignotto</strong>
              <span>
                <FiClock />
                09:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar></Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
