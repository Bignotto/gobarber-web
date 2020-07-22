import React from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";

import { Container, Toast } from "./styles";

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um erro:</strong>
          <p>
            A descrição do erro deve aparecer aqui, bem completa e descritiva.
          </p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>
      <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um erro:</strong>
          <p>
            A descrição do erro deve aparecer aqui, bem completa e descritiva.
          </p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
