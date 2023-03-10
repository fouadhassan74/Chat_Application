import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../Firebase";
import add from "../image/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handelAuth = async (e) => {
    e.preventDefault();
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (res) => {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${name + date}`);
      const upLoadTask = await uploadBytesResumable(storageRef, file).then(
        () => {
          getDownloadURL(storageRef).then(async (downLoadUrl) => {
            // update profile picture
            updateProfile(res.user, {
              displayName: name,
              photoURL: downLoadUrl,
            });
            // user database
            setDoc(doc(db, "allUsers", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downLoadUrl,
            });
            // chats documnt
            setDoc(doc(db, "userChats", res.user.uid), {});
          });
          navigate("/");
        }
      );
    });
    // const date = new Date().getTime();
    // const storageRef = ref(storage, `${name + date}`);
    // const upLoadTask = await uploadBytesResumable(storageRef, file).then(() => {
    //   getDownloadURL(storageRef).then(async (downLoadUrl) => {
    //     //update profile picture
    //     updateProfile(res.user, {
    //       name,
    //       photoURL: downLoadUrl,
    //     });
    //     // user database
    //     setDoc(doc(db, "allUsers", res.user.uid), {
    //       uid: res.user.uid,
    //       name,
    //       email,
    //       photoURL: downLoadUrl,
    //     });
    //     // chats documnt
    //     setDoc(doc(db, "userChats", res.user.uid), {});
    //   });
    //   navigate("/");
    // });
  };
  return (
    <div className="formContainer">
      <div className=" formWrapper">
        <span className="logo">Fouad Chat</span>
        <span className="title">Register</span>
        <form>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter The Name"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            style={{ display: "none" }}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={add} />
            <span>add an avatar</span>
          </label>
          <button onClick={handelAuth} disabled={loading}>
            Sign Up
          </button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something Error</span>}
        </form>
        <p>
          {" "}
          You do Have An Account <Link to="/login"> Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
