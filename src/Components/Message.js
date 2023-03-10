import React, { useEffect, useRef } from "react";
import { useManage } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import messi from "../image/28003-1671435885.webp";
const Message = (props) => {
  const { data } = useChatContext();
  const { currentUser } = useManage();
  console.log(props.message);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);
  return (
    <div
      ref={ref}
      className={`message ${
        props.message.senderId === currentUser.uid && "owner"
      }`}
      s
    >
      <div className="messageinfo">
        <img
          src={
            props.message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div className="messagecontent">
        <p>{props.message.text}</p>
        {props.message.img && <img src={props.message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
