import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import Webcam from "react-webcam";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import Menu from "./Menu";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const [camera, setCamera] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const { data } = React.useContext(ChatContext);

  // console.log(data);
  return (
    <div className="chat">
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
        {/* <span>{data.user?.status}</span> */}
        <div className="chat__icons">
          <button
            onClick={() => setCamera(!camera)}
            className="button__camera">
            {camera ? (
              <BsFillCameraVideoFill fill="#fff" />
            ) : (
              <BsFillCameraVideoOffFill fill="#fff" />
            )}
          </button>
          {camera ? (
            <Webcam
              className="camera"
              audio={false}
              width={300}
              height={300}
              videoConstraints={{
                width: 300,
                height: 300,
                facingMode: "user",
              }}
            />
          ) : null}
          <AiOutlineUserAdd />
          <IoMdMore onClick={(e) => setOpenMenu(!openMenu)} />
          {openMenu && <Menu />}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
