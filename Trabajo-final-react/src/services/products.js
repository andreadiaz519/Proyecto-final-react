import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

// Función para obtener todos los productos de Firestore
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  let products = [];
  
  querySnapshot.forEach((doc) => {
    const productData = doc.data();
    console.log("Datos del producto:", productData);  // Verifica los datos completos del producto
    products.push({ id: doc.id, ...productData });
  });

  console.log("Productos obtenidos desde Firebase:", products); // Verifica todos los productos
  return products;
};
