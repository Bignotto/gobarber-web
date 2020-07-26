import React, { useCallback } from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";
import { ToastMessage } from "../../hooks/toast";
import { Container } from "./styles";
import Toast from "./Toast";
import { useTransition } from "react-spring";

interface ToastContainerProps {
  messages: ToastMessage[];
  style?: object;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: "-120%", opacity: 0 },
      enter: { right: "0%", opacity: 1 },
      leave: { right: "-120%", opacity: 0 },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
