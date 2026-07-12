import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface BookData {
  title: string;
  author: string;
  price: number;
  rating: number;
  description: string;
  coverUrl: string | null;
}

export interface Book extends BookData {
  id: string;
}

export async function addBookToFirestore(books: BookData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "books"), books);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export async function fetchBooksFromFirestore(): Promise<Book[]> {
  const snapshot = await getDocs(collection(db, "books"));
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as BookData),
  }));
}

export async function fetchBookByIdFromFirestore(id: string): Promise<Book> {
  const snapshot = await getDoc(doc(db, "books", id));
  if (!snapshot.exists()) {
    throw new Error("Book not found");
  }
  return { id: snapshot.id, ...(snapshot.data() as BookData) };
}
