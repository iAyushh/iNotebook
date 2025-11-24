import { createContext } from "react";

const LoginContext = createContext({
  credentials: { name: "", email: "" },
  setCredentials: () => {}
});

export default LoginContext;
