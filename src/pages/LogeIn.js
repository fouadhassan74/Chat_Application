import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const LogeIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handel = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className=" formWrapper">
        <span className="logo">Fouad Chat</span>
        <span className="title">Register</span>
        <form>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button onClick={handel}>Sign In</button>
        </form>
        {err && <span>someting Error</span>}
        <p> You do not Have An Account Register</p>
      </div>
    </div>
  );
};

export default LogeIn;
