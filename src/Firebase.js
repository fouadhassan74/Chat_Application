import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAS61FVl8oO0g4Xnm21NfbhVMQKzU9Ezwg",
  authDomain: "chat-43963.firebaseapp.com",
  projectId: "chat-43963",
  storageBucket: "chat-43963.appspot.com",
  messagingSenderId: "71224536417",
  appId: "1:71224536417:web:db1e65289319d4ab8e6920",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, db, storage };
