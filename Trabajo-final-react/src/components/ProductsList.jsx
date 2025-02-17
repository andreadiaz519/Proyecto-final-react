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
          Debes iniciar sesión para ver los productos
        </Text>
      </Box>
    );
  }

  // Si hay un producto seleccionado, mostrar solo su vista detallada
  if (selectedProduct) {
    return (
      <Box bg="white" minH="100vh" p={8} textAlign="center">
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Volver"
          mb={4}
          onClick={() => setSelectedProduct(null)}
        />
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow="lg"
          maxW="400px"
          mx="auto"
        >
          <Image
            src={selectedProduct.url}
            alt={selectedProduct.nombre}
            objectFit="cover"
            width="100%"
            maxH="250px" // 🔥 Evita que se vea demasiado grande
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

          {/* Contador de cantidad */}
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

          {/* Botón de añadir al carrito con color del Header */}
          <Button
            mt={4}
            bgGradient="linear(to-r, #ff7e5f, #feb47b)"
            color="white"
            size="lg"
            width="100%"
            _hover={{ bgGradient: "linear(to-r, #feb47b, #ff7e5f)" }}
          >
            🛒 Añadir al carrito
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="white" minH="100vh" p={8}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
        Productos Disponibles
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="lg"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.03)", cursor: "pointer" }}
            onClick={() => {
              setSelectedProduct(product);
              setQuantity(1); // Reiniciar cantidad al seleccionar un nuevo producto
            }}
          >
            <Image
              src={product.url}
              alt={product.nombre}
              objectFit="cover"
              width="100%"
              maxH="180px" // 🔥 Evita que se vea demasiado grande
              borderRadius="md"
            />
            <Text mt={3} fontSize="lg" fontWeight="bold">
              {product.nombre}
            </Text>
            <Text fontWeight="bold" fontSize="xl" mt={1} color="orange.500">
              ${product.precio}
            </Text>

            {/* Botón de añadir al carrito con color del Header */}
            <Button
              mt={3}
              bgGradient="linear(to-r, #ff7e5f, #feb47b)"
              color="white"
              size="sm"
              width="100%"
              _hover={{ bgGradient: "linear(to-r, #feb47b, #ff7e5f)" }}
            >
              🛒 Añadir al carrito
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
