import React from "react";
import {
  BsFillBriefcaseFill,
  BsChatDots,
  BsClipboardData,
  BsGearWideConnected,
  BsListUl,
  BsQuestionCircle,
} from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";

const Menu = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <div className="menu">
      <button className="menu__btn">
        <img
          src={currentUser.photoURL}
          alt="user"
        />
        <span>{currentUser.displayName}</span>
      </button>
      <button className="menu__btn">
        <BsFillBriefcaseFill className="menu__icon" />
        <span className="menu__text">Offers</span>
      </button>
      <button className="menu__btn active">
        <BsChatDots className="menu__icon" />
        <span className="menu__text">Chats</span>
      </button>
      <button className="menu__btn">
        <BsClipboardData className="menu__icon" />
        <span className="menu__text">Board</span>
      </button>
      <button className="menu__btn">
        <BsGearWideConnected className="menu__icon" />
        <span className="menu__text">Application</span>
      </button>
      <button className="menu__btn">
        <BsListUl className="menu__icon" />
        <span className="menu__text">List</span>
      </button>
      <button className="menu__btn">
        <BsQuestionCircle className="menu__icon" />
        <span className="menu__text">FAQ</span>
      </button>
    </div>
  );
};

export default Menu;
