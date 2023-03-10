import { createContext, useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { useManage } from "./AuthContext";
const ChatContext = createContext();

function CahtContextProvider(props) {
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  const { currentUser } = useManage();
  const chatReducer = (state, action) => {
    switch (action.type) {
      default: {
        return state;
      }
      case "CHANGE_USER": {
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      }
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  );
}
export default CahtContextProvider;
export const useChatContext = () => {
  return useContext(ChatContext);
};
