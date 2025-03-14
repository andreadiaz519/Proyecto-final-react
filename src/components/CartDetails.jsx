import React, { useState, useEffect } from "react";
import { Box, Text, Button, Image, Input, useToast } from "@chakra-ui/react";
import { FaCheck, FaArrowLeft, FaShoppingCart } from "react-icons/fa";  
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/products";
import { useAuth } from "../context/AuthContext";

const CartDetails = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const { cart, setCart } = useAuth();  
  const [product, setProduct] = useState(null);  
  const [quantity, setQuantity] = useState(1);  
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);  
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
      mb="50px"
    >
      <Image
        src={product.url}
        alt={product.descripcion}
        objectFit="contain"
        width="90%"
        maxHeight="300px"
        borderRadius="md"
        mt={6}
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

      <Box display="flex" width="100%" justifyContent="space-between" gap={4} mb={6}>  
        <Button
          bgGradient="linear(to-r, #ff7e5f, #feb47b)"
          color="white"
          size="md"
          width="48%"
          _hover={{ bgGradient: "linear(to-r, #feb47b, #ff7e5f)", transform: "scale(1.05)", transition: "0.2s" }}
          onClick={() => addToCart(product, quantity)}
        >
          <FaShoppingCart style={{ marginRight: "8px" }} />
          Añadir al carrito
        </Button>

        <Button
          bgGradient="linear(to-r, #ff7e5f, #feb47b)"
          color="white"
          size="md"
          width="48%"
          _hover={{ bgGradient: "linear(to-r, #feb47b, #ff7e5f)", transform: "scale(1.05)", transition: "0.2s" }}
          onClick={() => navigate("/")}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default CartDetails;
