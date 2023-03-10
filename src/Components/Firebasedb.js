import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const date = new Date().getTime();
const storageRef = ref(storage, `${displayName + date}`);
const upLoadTask = uploadBytesResumable(storageRef, file).then(() => {
  getDownloadURL(storageRef).then(async (downloadUrl) => {
    // try {
    // update profile image
    await updateProfile(res.user, {
      displayName,
      photoURL: downloadUrl,
    });
    // create doc user in firestore
    await setDoc(doc(db, "user", res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
      photoURL: downloadUrl,
    });
    await setDoc(doc(db, "UserChats", res.user.uid), {});
    navigate("/");
    // } catch (err) {
    //   // console.log(err);
    //   setErr(true);
    //   setLoading(false);
    // }
  });
});
