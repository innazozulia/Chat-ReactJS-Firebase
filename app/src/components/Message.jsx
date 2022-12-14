import React from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = React.useContext(AuthContext);
  const { data } = React.useContext(ChatContext);
  // const [typing, setTyping] = React.useState(false);

  const ref = React.useRef();

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // console.log(data);
  // const typingInput = (e) => {
  //   e.preventDefault();
  //   if (
  //     message.senderId === currentUser.uid
  //       ? "typingindicator__content"
  //       : "secondary"
  //   ) {
  //     setTyping(true);
  //   }
  // };
  // typingInput();
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
      </div>
      <div className="message__content ">
        {/* {typing && (
          <div className="typingindicator__content">
            <div className="typingindicator__container">
              <div className="typingindicator__bubble">
                <div className="typingindicator__bubble--dot"></div>
                <div className="typingindicator__bubble--dot"></div>
                <div className="typingindicator__bubble--dot"></div>
              </div>
            </div>
          </div>
        )} */}
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
    </div>
  );
};

export default Message;
