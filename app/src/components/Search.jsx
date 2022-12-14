import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userNameFromInput, setUserNameFromInput] = React.useState("");
  // const [online, setOnline] = React.useState(true);
  const [actualUser, setActualUser] = React.useState(null);
  const [error, setError] = React.useState(false);

  const { currentUser } = React.useContext(AuthContext);

  // const handleClick = (event) => {
  //   // 👇️ toggle isActive state on click
  //   setOnline((current) => !current);
  // };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userNameFromInput),
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setActualUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKeyMove = (e) => {
    e.code === "Enter" && handleSearch();
    // handleClick();
  };

  console.log(actualUser);

  const handleUserChat = async () => {
    //check chats
    const combinedId =
      currentUser.uid > actualUser.uid
        ? currentUser.uid + actualUser.uid
        : actualUser.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: actualUser.uid,
            displayName: actualUser.displayName,
            photoURL: actualUser.photoURL,
            // isOnline: true,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", actualUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            // isOnline: true,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(true);
    }
    setActualUser(null);
    setUserNameFromInput("");
  };

  return (
    <div className="search">
      <div className="search__form">
        <BiSearchAlt2 className="searct__icon" />
        <input
          type="text"
          placeholder="find a user and press Enter"
          onKeyDown={handleKeyMove}
          value={userNameFromInput}
          onChange={(e) => setUserNameFromInput(e.target.value)}
        />
      </div>
      {error && <span>User not found :( </span>}
      {actualUser && (
        <div
          // className={online ? "red" : "user-chat"}
          className="user-chat"
          onClick={handleUserChat}>
          <img
            src={actualUser.photoURL}
            alt="user"
          />
          <div className="user__chat--info">
            <span>{actualUser.displayName}</span>
            {/* {online && <p>{actualUser.isOnline} </p>} */}
            {/* {online && <p>online</p>} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
