import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Image, Button, Spinner } from "@chakra-ui/react";
import { getProductById } from "../services/products";

const ProductPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(" useParams() ID recibido:", id); 

  useEffect(() => {
    if (!id) {
      console.error(" No se recibió un ID en useParams()");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        console.log(" Producto recibido en ProductPage:", data); 
        setProduct(data);
      } catch (error) {
        console.error(" Error al obtener el producto:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spinner size="xl" />;
  if (!product) return <Text>No se encontró el producto</Text>;

  return (
    <Box 
      p={6} 
      textAlign="center" 
      bg="gray.800" // Fondo oscuro para mejorar el contraste
      color="white" 
      borderRadius="lg"
      boxShadow="lg"
      maxW="500px"
      mx="auto"
      mt={8}
    >
      <Image 
        src={product.url || "https://via.placeholder.com/400?text=Imagen+No+Disponible"} 
        alt={product.name || "Producto sin imagen"} 
        boxSize="400px" // Imagen más grande
        objectFit="cover" // Ajusta la imagen sin recortarla
        mx="auto" 
        borderRadius="md"
      />
      <Text fontSize="2xl" fontWeight="bold" mt={4}>
        {product.name ? product.name : "Producto sin nombre"} {/* ✅ Se muestra el nombre correctamente */}
      </Text>
      <Text fontSize="xl" color="pink.300" fontWeight="bold">
        ${product.precio || "Precio no disponible"}
      </Text>
      <Text mt={2} fontSize="md" color="white"> {/* ✅ Descripción en blanco */}
        {product.descripcion || "Descripción no disponible"}
      </Text>
      <Button mt={4} colorScheme="pink">
        Añadir al carrito
      </Button>
    </Box>
  );
};

export default ProductPage;
