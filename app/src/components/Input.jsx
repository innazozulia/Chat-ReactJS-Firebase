import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";

const Input = () => {
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
      />
      <div className="send">
        <AiOutlineUserAdd className="send__item" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <BsFillCameraVideoFill className="send__item" />
        </label>
        <button>
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default Input;
