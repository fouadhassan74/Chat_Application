import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useChatContext();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => unsub();
  }, [data.chatId]);
  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </div>
  );
};

export default Messages;
