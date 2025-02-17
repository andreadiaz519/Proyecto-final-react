// src/services/todos.js
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const createTodo = async (name, uid) => {
  if (!uid || typeof uid !== "string") {
    console.error("Error: uid inválido", uid);
    return;
  }

  try {
    const doc = await addDoc(collection(db, "todos"), {
      name,
      uid,  
      isCompleted: false,
    });
    console.log("Todo creado con ID:", doc.id);
    return doc;
  } catch (error) {
    console.error(" Error al crear el todo:", error);
  }
};

export const getTodos = async () => {
  try {
    const data = await getDocs(collection(db, "todos"));
    let todos = [];
    data.forEach((doc) => {
      todos.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return todos;
  } catch (error) {
    console.error(" Error al obtener todos:", error);
    return [];
  }
};

export const getUserTodos = async (uid) => {
  if (!uid || typeof uid !== "string") {
    console.error(" Error: uid inválido", uid);
    return [];
  }

  try {
    const q = query(collection(db, "todos"), where("uid", "==", uid));
    const data = await getDocs(q);
    let todos = [];
    data.forEach((doc) => {
      todos.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return todos;
  } catch (error) {
    console.error(" Error al obtener los todos del usuario:", error);
    return [];
  }
};
