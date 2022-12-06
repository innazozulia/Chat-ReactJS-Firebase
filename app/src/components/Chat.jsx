import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__info">
        <span>username</span>
        <div className="chat__icons">
          <BsFillCameraVideoFill />
          <AiOutlineUserAdd />
          <IoMdMore />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
