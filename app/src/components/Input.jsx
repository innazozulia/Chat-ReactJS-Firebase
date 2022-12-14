import React from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { IoSendSharp } from "react-icons/io5";
import { AiTwotoneAudio } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { MdVideoLibrary } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [openMoreMenu, setOpenMoreMenu] = React.useState(false);
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [audio, setAudio] = React.useState(null);

  const { currentUser } = React.useContext(AuthContext);
  const { data } = React.useContext(ChatContext);

  const handleSendMessage = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
      console.log("active");
    } else if (video) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, video);

      await uploadBytesResumable(storageRef, video).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              video: downloadURL,
            }),
          });
        });
      });
    } else if (audio) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, audio);

      await uploadBytesResumable(storageRef, audio).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              audio: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
    setVideo(null);
    setOpenMoreMenu(false);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="message-input"
      />
      <FiMoreVertical onClick={(e) => setOpenMoreMenu(!openMoreMenu)} />
      {openMoreMenu && (
        <div className="input__menu">
          <input
            type="file"
            accept=".mp3, .WAV, .AAC"
            style={{ display: "none" }}
            id="audio"
            onChange={(e) => {
              setAudio(e.target.files[0]);
            }}
          />
          <label htmlFor="audio">
            <AiTwotoneAudio className="input__menu-icon" />
          </label>
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            style={{ display: "none" }}
            id="video"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
          />
          <label htmlFor="video">
            <MdVideoLibrary className="input__menu-icon" />
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="file">
            <BsImageFill className="input__menu-icon" />
          </label>
        </div>
      )}
      {/* {error && <span>Something went wrong...</span>} */}
      <div className="send">
        <IoSendSharp
          className="send__icon"
          onClick={handleSendMessage}
        />
      </div>
      {/* {active && (
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
    </div>
  );
};

export default Input;
