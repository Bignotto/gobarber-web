import React, { createContext, useContext, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

interface TotastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<TotastContextData>({} as TotastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log("addToast");
  }, []);

  const removeToast = useCallback(() => {
    console.log("removeToast");
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

function useToast(): TotastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToasterProvider tag");
  }

  return context;
}

export { ToastProvider, useToast };
