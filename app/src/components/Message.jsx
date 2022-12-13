import React from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = React.useContext(AuthContext);
  const { data } = React.useContext(ChatContext);

  const ref = React.useRef();

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // const messageClass = { message } === currentUser.uid ? "sent" : "received";
  // const newMessage = ({ message }) => {
  //   if (message.senderId !== currentUser.uid) {
  //     console.log("work");
  //   }
  // };

  // const handleClick = (event) => {
  //   // 👇️ toggle isActive state on click
  //   setIsActive((current) => !current);
  // };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="message__info">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* <span>just now</span> */}
        <span>{data.data}</span>
      </div>
      {/* {messageClass && messageClass} */}
      <div className="message__content ">
        {message.text && <p>{message.text}</p>}
        {message.image && (
          <img
            src={message.image}
            alt=""
          />
        )}
        {message.video && (
          <video
            width="320"
            height="240"
            controls>
            <source
              src={message.video}
              type="video/mp4"
            />
          </video>
        )}
        {message.audio && (
          <audio controls>
            <source
              src={message.audio}
              type="audio/ogg"
            />
          </audio>
        )}
      </div>
      {/* <button
        className={isActive ? "bg-salmon" : ""}
        onClick={handleClick}>
        Click
      </button> */}
    </div>
  );
};

export default Message;
