import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    let products = [];

    querySnapshot.forEach((doc) => {
      const productData = { id: doc.id, ...doc.data() }; // 🔹 Agregar el ID del producto
      products.push(productData);
    });

    console.log("Productos obtenidos desde Firebase:", products);
    return products;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

// Obtener un producto por ID
export const getProductById = async (productId) => {
  try {
    if (!productId) return null;
    
    const productRef = doc(db, "productos", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = { id: productSnap.id, ...productSnap.data() }; // 🔹 Agregar el ID
      console.log("Producto obtenido por ID:", productData);
      return productData;
    } else {
      console.error("Producto no encontrado");
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo producto por ID:", error);
    return null;
  }
};
