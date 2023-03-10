import React from "react";
import { useManage } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import add from "../image/add.png";
import cam from "../image/cam.png";
import more from "../image/more.png";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { currentUser } = useManage();
  const { dispatch, data } = useChatContext();
  console.log(data);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={add} />
          <img src={cam} />
          <img src={more} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
