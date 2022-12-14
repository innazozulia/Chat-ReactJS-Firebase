import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
// import { MdOutlinePermMedia } from "react-icons/md";

const Chats = () => {
  const [chats, setChats] = React.useState([]);
  // const [online, setOnline] = React.useState(true);
  // const [notification, setNotification] = React.useState(0);

  const { currentUser } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(ChatContext);

  const { data } = React.useContext(ChatContext);

  // const user1 = auth.currentUser;
  // currentUser.auth;
  // const user2 = auth.

  // console.log(currentUser.auth);
  // !!!!!! cteatedat
  // console.log(currentUser.metadata.lastSignInTime);

  React.useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    // console.log(db);
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // console.log(data.user.displayName);
  // console.log(user1);
  // console.log(data.chatId);
  // console.log(data.user);
  // console.log(currentUser);
  // console.log(data.UserImpl);
  // console.log(chats.message);

  const handleSelectUser = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // console.log(data.user.auth());

  console.log(data);

  // console.log(data.user);
  return (
    <div className="chats">
      {Object === null ||
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="user-chat"
              key={chat[0]}
              onClick={() => handleSelectUser(chat[1].userInfo)}>
              {data?.from !== currentUser && data?.unread && (
                <small className="unread">New</small>
              )}
              {/* {chat[1].userInfo?.isOnline ? "online" : "offline"} */}
              <img
                src={chat[1].userInfo?.photoURL}
                alt=""
              />
              <div className="user__chat--info">
                <span>
                  {chat[1].userInfo?.displayName}
                  {/* {notification > 0 && (
                    <p className="counter">{notification}</p>
                  )} */}
                </span>
                <p>
                  {chat[1].lastMessage?.text ? chat[1].lastMessage?.text : ""}
                </p>
                {/* <small>last seen: {currentUser.metadata.lastSignInTime}</small> */}
                {/* <small>last seen: {currentUser.metadata.createdAt}</small> */}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
