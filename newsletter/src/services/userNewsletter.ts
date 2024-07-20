const getFirestore = () => import("../firebase/firestore");
export const createUsers = async (user: any) => {
    try {
      const { doc, setDoc, db, addDoc, collection, getDocs, query, where } = await getFirestore();
      
      // Check if the user already exists
      const usersCollection = collection(db, "usersNewsletter");
      const q = query(usersCollection, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        console.log("User already exists with this email.");
        return null;
      }
  
      // If not, add the user
      const docRef = await addDoc(usersCollection, user);
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