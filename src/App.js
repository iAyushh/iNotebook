import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginContext from "./context/LoginContext";
import NoteState from "./context/notes/NoteState";
import AuthState from "./context/auth/AuthState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  
  const [credentials, setCredentials] = useState({
    name: "",
    email: ""
  });

  return (
    <>
      <LoginContext.Provider value={{ credentials, setCredentials }}>
        <NoteState>
          <AuthState>
            <Router>
              <Navbar />
              <Alert message="this is an alert" />
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </Router>
          </AuthState>
        </NoteState>
      </LoginContext.Provider>
    </>
  );
}

export default App;
