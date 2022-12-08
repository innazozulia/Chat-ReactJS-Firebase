import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase";
import "../Form/Form.scss";

const Register = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const [status, setStatus] = React.useState("");
  // const options = ["Online", "Offline", "Busy", "Absent"];

  // const onOptionChangeHandler = (event) => {
  //   setStatus(event.target.value);
  // };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    // const status = e.target[4].value;

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
              // status,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              // status,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="logo">Leaf Chat</span>
        <span className="title">Register</span>
        {loading ? (
          <p>Loading data...</p>
        ) : (
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
            {/* <select onChange={onOptionChangeHandler}>
              <option>Choose your status</option>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select> */}
            <button>Sign up</button>
            {error && <span>Something went wrong ...</span>}
          </form>
        )}
        <p>
          You do have an account?
          <Link
            className="link"
            to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
