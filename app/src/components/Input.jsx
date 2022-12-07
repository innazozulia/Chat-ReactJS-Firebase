import React from "react";
import { IoSendSharp } from "react-icons/io5";

const Input = () => {
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file"></label>
        <IoSendSharp className="send__icon" />
      </div>
    </div>
  );
};

export default Input;
