import React, { useState, useEffect } from "react";
import { Box, Text, Button, Image, Grid, Spinner } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext.jsx";
import { getProducts } from "../services/products";
import { FaCheck } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const { user, cart, setCart } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const productList = await getProducts();
          setProducts(productList);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [user]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);

    toast({
      render: () => (
        <Box
          color="white"
          p={3}
          bgGradient="linear(to-r, #ff7e5f, #feb47b)"
          borderRadius="md"
          boxShadow="xl"
          textAlign="center"
        >
          <FaCheck style={{ marginRight: "8px", fontSize: "20px" }} />
          <Text fontWeight="bold" fontSize="lg">
            ¡Agregado al carrito!
          </Text>
        </Box>
      ),
      duration: 2000,
      isClosable: true,
    });
  };

  if (loading) return <Spinner size="xl" />;

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="xl" color="red.500">Debe iniciar sesión</Text>
      </Box>
    );
  }

  return (
    <Box bg="#f8f9fa" minH="100vh" p={10} pb={20}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
        🛍️ Productos Disponibles
      </Text>

      <Grid
        templateColumns={{
          base: "1fr", 
          sm: "repeat(auto-fit, minmax(250px, 1fr))", 
        }}
        gap={8} 
        justifyContent="center"
        alignItems="center"
      >
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="2xl"
            overflow="hidden"
            p={6}
            boxShadow="2xl"
            bg="white"
            textAlign="center"
            maxW="300px"
            mx="auto"
          >
            <Image
              src={product.url}
              alt={product.descripcion}
              objectFit="cover"
              width="100%"
              height="250px"
            />
            <Text fontSize="2xl" fontWeight="bold" mt={2} color="orange.500">
              ${Number(product.precio || 0).toFixed(2)}
            </Text>

            <Link to={`/productos/${product.id}`}>
              <Button
                mt={4}
                bgGradient="linear(to-r, #ff7e5f, #feb47b)"
                color="white"
                size="lg"
                width="full"
                _hover={{ bgGradient: "linear(to-r, #feb47b, #ff7e5f)", transform: "scale(1.05)", transition: "0.2s" }}
              >
                🔍 Ver más
              </Button>
            </Link>

            <Button
              mt={2}
              bgGradient="linear(to-r, #ff7e5f, #feb47b)"
              color="white"
              size="lg"
              width="full"
              _hover={{ bgGradient: "linear(to-r, #feb47b, #ff7e5f)", transform: "scale(1.05)", transition: "0.2s" }}
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

export default ProductsList;
