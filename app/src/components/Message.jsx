import React from "react";

const Message = () => {
  return (
    <div className="message ">
      <div className="message__info">
        <img
          src="./img/dash.png"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="message__content">
        <p>message text</p>
        <img
          src="./img/dash.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
