import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { updateDoc, doc } from "firebase/firestore";

const Navbar = () => {
  const { currentUser } = React.useContext(AuthContext);
  // console.log(currentUser.auth);

  console.log(currentUser.auth);

  const handleLogout = async () => {
    await updateDoc(doc(db, "users", currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    // console.log("event");
  };
  return (
    <div className="navbar">
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt="user"
        />
        <span className="user__wrapper"></span>
        <span>{currentUser.displayName}</span>
        <span>{currentUser && "online"}</span>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
