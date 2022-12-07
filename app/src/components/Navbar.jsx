import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt="user"
        />
        <span>{currentUser.displayName}</span>
      </div>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};

export default Navbar;
