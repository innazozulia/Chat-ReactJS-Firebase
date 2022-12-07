import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import "../Form/Form.scss";

const Login = () => {
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="logo">Leaf Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button>Sign in</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account?
          <Link
            className="link"
            to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
