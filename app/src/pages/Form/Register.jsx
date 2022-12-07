import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase";
import "../Form/Form.scss";

const Register = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //create unique image name
      // const da te = new Date().getTime();
      // const storageRef = ref(storage, `${displayName + date}`);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        },
      );
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="logo">Leaf Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display name"
          />
          <input
            type="email"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img
              src="./img/add.png"
              alt="add avatar"
            />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span>Something went wrong ...</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
