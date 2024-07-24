import {
    DocumentData,
    DocumentSnapshot,
    QueryDocumentSnapshot,
    Timestamp,
    getCountFromServer,
  } from "firebase/firestore";
import { SetStateAction } from "react";

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

export async function searchUsersNewsletter({
  searchText,
  pageSize,
  lastVisible,
}: any): Promise<{
  users: any[];
  lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | null;
}> {
  const { collection, query, where, getDocs, orderBy, startAfter, limit, db } =
    await getFirestore();
  const usersRef = collection(db, "usersNewsletter");
  let q = query(
    usersRef,
    where("name", ">=", searchText),
    where("name", "<=", searchText + "\uf8ff"),
    orderBy("name"),
    limit(pageSize)
  );

  if (lastVisible) {
    q = query(q, startAfter(lastVisible));
  }

  try {
    const querySnapshot = await getDocs(q);
    const users: any[] = [];
    querySnapshot.forEach((doc: any) => {
      users.push({ ...(doc.data() as any), id: doc.id });
    });

    const newLastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { users, lastVisible: newLastVisible };
  } catch (error) {
    console.error("Error searching users: ", error);
    throw new Error("Error searching users");
  }
}


export async function getFilteredUsersNewsletter({
    startAfterDoc,
    endBeforeDoc,
    setPageCount,
    setLastVisibileReference,
  }: {
    startAfterDoc?: QueryDocumentSnapshot<DocumentData> | null;
    endBeforeDoc?: QueryDocumentSnapshot<DocumentData> | null;
    setPageCount: React.Dispatch<SetStateAction<number>>;
    setLastVisibileReference: React.Dispatch<QueryDocumentSnapshot<
      DocumentData,
      DocumentData
    > | null>;
  }) {
    try {
      const {
        collection,
        query,
        startAfter,
        endBefore,
        limit,
        getDocs,
        db,
      } = await getFirestore();
      const usersCollectionRef = collection(db, "usersNewsletter");
  
      let usersQuery = query(usersCollectionRef);
  
      const countSnapshot = await getCountFromServer(usersQuery);
      // Pagination
      if (startAfterDoc && !endBeforeDoc) {
        usersQuery = query(usersQuery, startAfter(startAfterDoc));
      }
      if (endBeforeDoc && !startAfterDoc) {
        usersQuery = query(usersQuery, endBefore(endBeforeDoc));
      }
      usersQuery = query(usersQuery, limit(50));
  
      const snapshot = await getDocs(usersQuery);
  
      // Détails de pagination
      const count = countSnapshot.data().count;
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const firstVisible = snapshot.docs.at(0);
      //const count = snapshot.size;
      const pageCount = Math.ceil(count / 50);
  
      const docs = snapshot.docs.map((document) => {
        return {
          id: document.id,
          ...document.data(),
        } as any;
      });
      setPageCount(Math.ceil(count / 50));
      setLastVisibileReference(lastVisible);
      return { docs, lastVisible, count, firstVisible, pageCount };
    } catch (error) {
      console.error("Error getting filtered users:", error);
      throw new Error("Error getting filtered users");
    }
  }
  
  
  
export async function getUsersNewsletterLimit() {
    const { db, collection, query, onSnapshot, where, limit, getDocs } =
      await getFirestore();
    const collectionReference = collection(db, "usersNewsletter");
    const usersQuery = query(
      collectionReference,
      limit(50)
    );
    const snapshot = await getDocs(usersQuery);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  
    const docs = snapshot.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      } as any;
    });
  
    return {
      docs,
      lastVisible,
    };
  }



  export async function getUsersNewsletterCount() {
    const { db, collection, query } = await getFirestore();
    const collectionReference = collection(db, "usersNewsletter");
    const professionalSuggestionsQuery = query(collectionReference);
  
    const snapshot = await getCountFromServer(professionalSuggestionsQuery);
    return snapshot.data().count;
  }