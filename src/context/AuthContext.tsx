import React, { createContext, useCallback } from "react";

interface AuthContextData {
  name: string;
  signIn(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(() => {
    console.log("sign in");
  }, []);

  return (
    <AuthContext.Provider value={{ name: "Thiago", signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
