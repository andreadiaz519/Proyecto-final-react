import React, { useState, useEffect } from "react";
import { Box, Text, Button, Image, Input, useToast } from "@chakra-ui/react";
import { FaCheck, FaArrowLeft, FaShoppingCart } from "react-icons/fa";  // Importando el icono del carrito
import { useParams } from "react-router-dom";
import { getProductById } from "../services/products";
import { useAuth } from "../context/AuthContext";

const CartDetails = () => {
  const { id } = useParams();  // Obtenemos el id del producto de la URL
  const { cart, setCart } = useAuth();  // Gestionamos el carrito de compras
  const [product, setProduct] = useState(null);  // Estado para el producto
  const [quantity, setQuantity] = useState(1);  // Estado para la cantidad
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);  // Obtenemos el producto por su id
      setProduct(productData);
    };

    fetchProduct();
  }, [id]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    toast({
      render: () => (
        <Box
          color="white"
          p={3}
          bgGradient="linear(to-r, #ff7e5f, #feb47b)"
          borderRadius="md"
          boxShadow="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          maxW="300px"
          mx="auto"
        >
          <FaCheck style={{ marginRight: "8px", fontSize: "20px" }} />
          <Text fontWeight="bold" fontSize="lg">
            ¡Producto añadido al carrito!
          </Text>
        </Box>
      ),
      duration: 2000,
      isClosable: true,
    });
  };

  if (!product) return <Text>Cargando...</Text>;

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      p={4}
      boxShadow="2xl"
      bg="white"
      maxW="500px"
      mx="auto"
      textAlign="center"
      mt="50px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mb={6}
    >
      <Image
        src={product.url}
        alt={product.descripcion}
        objectFit="contain"
        width="90%"
        maxHeight="300px"
        borderRadius="md"
      />
      <Text fontSize="md" color="black" mt={4} px={2}>
        {product.descripcion}
      </Text>

      <Text fontSize="xl" fontWeight="bold" color="orange.500" mt={4}>
        ${Number(product.precio || 0).toFixed(2)}
      </Text>

      <Box mt={4}>
        <Input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          min={1}
          width="80px"
          textAlign="center"
          mb={4}
        />
      </Box>

      <Box display="flex" width="100%" justifyContent="space-between" gap={4}>
        <Button
          bgGradient="linear(to-r, #ff9a9e, #fad0c4)"
          color="white"
          size="md"
          width="48%"
          _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
          onClick={() => addToCart(product, quantity)}
        >
          <FaShoppingCart style={{ marginRight: "8px" }} />  {/* Icono de carrito */}
          Añadir al carrito
        </Button>

        <Button
          bgGradient="linear(to-r, #ff9a9e, #fad0c4)"  // Degradado en el botón Volver
          color="white"
          size="md"
          width="48%"
          _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
          onClick={() => window.history.back()}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default CartDetails;
