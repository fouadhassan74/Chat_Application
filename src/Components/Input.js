import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useManage } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import { db, storage } from "../Firebase";
import image from "../image/img.png";
import attach from "../image/attach.png";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useManage();
  const { data } = useChatContext();
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const upLoadTask = uploadBytesResumable(storageRef, img);
      upLoadTask.on(
        (error) => {},
        () => {
          getDownloadURL(upLoadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
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
    setImg(null);
  };
  return (
    <div className="input">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Write a message"
      />
      <div className="send">
        <img src={attach} />
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="l1"
          style={{ display: "none" }}
        />

        <label htmlFor="l1">
          <img src={ image} />
        </label>
        <button onKeyDown={handleSend} onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
};

export default Input;
