import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { MdOutlinePermMedia } from "react-icons/md";

const Chats = () => {
  const [chats, setChats] = React.useState([]);

  const { currentUser } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(ChatContext);

  React.useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelectUser = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object === undefined ||
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="user-chat"
              key={chat[0]}
              onClick={() => handleSelectUser(chat[1].userInfo)}>
              <img
                src={chat[1].userInfo?.photoURL}
                alt=""
              />
              <div className="user__chat--info">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>
                  {chat[1].lastMessage?.text ? (
                    chat[1].lastMessage?.text
                  ) : (
                    <span className="media">
                      sent media file
                      <MdOutlinePermMedia className="media__icon" />
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
