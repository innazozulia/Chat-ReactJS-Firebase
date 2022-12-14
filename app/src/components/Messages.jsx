import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
// import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const { data } = React.useContext(ChatContext);
  const [messages, setMessages] = React.useState([]);
  // const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message
          message={message}
          key={message.id}
        />
      ))}
    </div>
  );
};

export default Messages;
