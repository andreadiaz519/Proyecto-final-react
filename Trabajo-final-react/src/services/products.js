import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Función para obtener todos los productos de Firestore
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "productos")); // Asegúrate de que "productos" sea el nombre exacto en Firestore
  let products = [];
  
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};
