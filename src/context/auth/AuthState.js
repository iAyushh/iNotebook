import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
