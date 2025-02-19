import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { getProducts } from "../services/products";
import {
  Box,
  Text,
  Spinner,
  Image,
  Button,
  Grid,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";

export const ProductsList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const data = await getProducts();
          setProducts(data);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Spinner size="xl" />;

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="xl" color="red.500">
          
        </Text>
      </Box>
    );
  }

  if (selectedProduct) {
    return (
      <Box bg="#f8f9fa" minH="100vh" p={8} textAlign="center">
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Volver"
          mb={4}
          onClick={() => setSelectedProduct(null)}
        />
        <Box
          borderWidth="1px"
          borderRadius="2xl"
          overflow="hidden"
          p={6}
          boxShadow="xl"
          maxW="400px"
          mx="auto"
          bg="white"
        >
          <Image
            src={selectedProduct.url}
            alt={selectedProduct.nombre}
            objectFit="contain"
            width="100%"
            maxHeight="250px"
            borderRadius="md"
          />
          <Text mt={3} fontSize="xl" fontWeight="bold">
            {selectedProduct.nombre}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2} color="orange.500">
            ${selectedProduct.precio}
          </Text>
          <Text fontSize="md" mt={3} color="gray.600">
            {selectedProduct.descripcion}
          </Text>

          <HStack justify="center" mt={4}>
            <IconButton
              icon={<MinusIcon />}
              aria-label="Disminuir cantidad"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            />
            <Text fontSize="xl">{quantity}</Text>
            <IconButton
              icon={<AddIcon />}
              aria-label="Aumentar cantidad"
              onClick={() => setQuantity(quantity + 1)}
            />
          </HStack>

          <Button
            mt={4}
            bgGradient="linear(to-r, #ff9a9e, #fad0c4)"
            color="white"
            size="lg"
            width="100%"
            _hover={{ bgGradient: "linear(to-r, #fad0c4, #ff9a9e)" }}
          >
            🛒 Añadir al carrito
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="#f8f9fa" minH="100vh" p={10} pb={20}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
        🛍️ Productos Disponibles
      </Text>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={8}
        justifyItems="center"
      >
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="2xl"
            overflow="hidden"
            p={5}
            boxShadow="xl"
            transition="all 0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "2xl",
            }}
            bg="white"
            width="100%"
            maxW="320px"
            textAlign="center"
            cursor="pointer"
            onClick={() => {
              setSelectedProduct(product);
              setQuantity(1);
            }}
          >
            {/* 📌 Contenedor de la imagen con tamaño controlado */}
            <Box height="200px" overflow="hidden" borderRadius="xl">
              <Image
                src={product.url}
                alt={product.nombre}
                objectFit="contain"
                width="100%"
                height="100%"
              />
            </Box>

            <Text mt={4} fontSize="lg" fontWeight="bold">
              {product.nombre}
            </Text>
            <Text fontSize="xl" fontWeight="bold" mt={1} color="orange.500">
              ${product.precio}
            </Text>

            <Button
              mt={4}
              bgGradient="linear(to-r, #ff9a9e, #fad0c4)"
              color="white"
              size="md"
              width="full"
              _hover={{ bgGradient: "linear(to-r, #fad0c4, #ff9a9e)" }}
            >
              🛒 Añadir al carrito
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
