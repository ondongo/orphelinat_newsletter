const getFirestore = () => import("../firebase/firestore");
export const createUsers = async (user: any) => {
    try {
      const { query, where, getDocs, collection, db } = await getFirestore();
  
      const q = query(
        collection(db, "usersNewsletter"),
        where("email", "==", user.email)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        console.log("User already exists with this email");
        return null;
      }
  
      const { doc, setDoc, addDoc } = await getFirestore();
      const docRef = await addDoc(collection(db, "usersNewsletter"), user);
      console.log("User added with ID:", docRef.id);
  
      await setDoc(doc(db, "usersNewsletter", docRef.id), {
        ...user,
        id: docRef.id,
      });
  
      return docRef.id;
    } catch (error) {
      console.error("Error adding usersNewsletter:", error);
      return null;
    }
  };