import React, { useState } from "react";
import { db } from "../Firebase";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useManage } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useManage();
  const { dispatch } = useChatContext();
  const handleSearch = async () => {
    const q = query(
      collection(db, "allUsers"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await (
        await getDocs(q)
      ).forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    // setUser(null);
    // setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Find a user"
          value={userName}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div onClick={handleSelect} className="userChat">
          <img src={user.photoURL} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <p> hello</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
