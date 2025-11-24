import { useContext } from "react";
import  AuthContext  from "../context/auth/AuthContext";
import Notes from "./Notes";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="my-3">
      {user && (
        <h2 className="mb-4">
          Hello {user.name}
        </h2>
      )}

      <Notes />
    </div>
  );
};

export default Home;
