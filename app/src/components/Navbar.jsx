import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = React.useContext(AuthContext);
  console.log(currentUser.status);
  return (
    <div className="navbar">
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt="user"
        />
        <span>{currentUser.displayName}</span>
        <span>{currentUser.status}</span>
      </div>

      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};

export default Navbar;
