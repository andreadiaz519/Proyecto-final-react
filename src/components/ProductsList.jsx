import React, { useState, useEffect } from "react";
import { Box, Text, Button, Image, Grid, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import { useAuth } from "../context/AuthContext"; // Si usas contexto de autenticación

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useAuth(); // Aquí gestionamos el carrito
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
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
          <Text fontWeight="bold" fontSize="lg">
            ¡Producto añadido al carrito!
          </Text>
        </Box>
      ),
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#f8f9fa" minH="100vh" p={10} pb={20}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
        🛍️ Productos Disponibles
      </Text>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={10}
        justifyItems="center"
      >
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="xl"
            overflow="hidden"
            p={6}
            boxShadow="2xl"
            bg="white"
            maxW="360px"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Image
              src={product.url}
              alt={product.descripcion}
              objectFit="contain"
              width="100%"
              height="250px"
              borderRadius="lg"
            />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mt={1}
              color="orange.500"
            >
              ${Number(product.precio || 0).toFixed(2)}
            </Text>

            <Link to={`/productos/${product.id}`}>
              <Button
                mt={4}
                bgGradient="linear(to-r, #ff9a9e, #fad0c4)"
                color="white"
                size="sm"
                width="full"
                _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
              >
                🔍 Ver más
              </Button>
            </Link>

            <Button
              mt={4}
              bgGradient="linear(to-r, #ff9a9e, #fad0c4)"
              color="white"
              size="sm"
              width="full"
              _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
              onClick={() => addToCart(product)}
            >
              🛒 Añadir al carrito
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
