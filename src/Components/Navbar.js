import React from "react";
import messi from "../image/28003-1671435885.webp";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useManage } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useManage();
  return (
    <div className="navbar">
      <span className="logo">Fouad Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="user" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
