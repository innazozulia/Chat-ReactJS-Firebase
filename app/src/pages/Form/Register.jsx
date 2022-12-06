import React from "react";
import "../Form/Form.scss";

const Register = () => {
  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="logo">Leaf Chat</span>
        <span className="title">Register</span>
        <form>
          <input
            type="text"
            placeholder="Display name"
          />
          <input
            type="email"
            placeholder="Email"
          />
          <input
            type="passowrd"
            placeholder="Password"
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img
              src="./img/add.png"
              alt="add avatar"
            />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
