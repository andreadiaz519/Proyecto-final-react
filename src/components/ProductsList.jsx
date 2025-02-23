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
  useToast,
  Input,
  HStack,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export const ProductsList = () => {
  const { user, cart, setCart } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();

  // Estados para el filtrado
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    } else {
      setLoading(false);
    }
  }, [user]);

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
            ¡Agregado al carrito!
          </Text>
        </Box>
      ),
      duration: 2000,
      isClosable: true,
    });

    setSelectedProduct(null);
  };

  if (loading) return <Spinner size="xl" />;

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="xl" color="red.500"></Text>
      </Box>
    );
  }

  //Filtrado de productos
  const filteredProducts = products.filter((product) => {
    const matchesDescription = product.descripcion
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesMinPrice =
      minPrice === "" || product.precio >= parseFloat(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || product.precio <= parseFloat(maxPrice);
    return matchesDescription && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <Box bg="#f8f9fa" minH="100vh" p={10} pb={20}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
        🛍️ Productos Disponibles
      </Text>

      {selectedProduct ? (
        <Box
          borderWidth="1px"
          borderRadius="2xl"
          overflow="hidden"
          p={6}
          boxShadow="2xl"
          bg="white"
          maxW="500px"
          mx="auto"
          textAlign="center"
        >
          <Image
            src={selectedProduct.url}
            alt={selectedProduct.descripcion}
            objectFit="contain"
            width="100%"
            height="300px"
          />
          <Text mt={4} fontSize="xl" fontWeight="bold">
            {/* Descripción con el tamaño y color modificados */}
            <Text fontSize="sm" color="gray.600">
              {selectedProduct.descripcion}
            </Text>
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mt={1} color="orange.500">
            ${Number(selectedProduct.precio || 0).toFixed(2)}
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
            />
          </Box>
          <Button
            mt={4}
            bgGradient="linear(to-r, #ff9a9e, #fad0c4)"
            color="white"
            size="lg"
            width="full"
            _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
            onClick={() => addToCart(selectedProduct, quantity)}
          >
            🛒 Añadir al carrito
          </Button>
          <Button
            mt={2}
            colorScheme="red"
            variant="outline"
            width="full"
            onClick={() => setSelectedProduct(null)}
          >
            Volver
          </Button>
        </Box>
      ) : (
        <>
          {/* Filtros */}
          <Box mb={6}>
            <HStack spacing={4}>
              <Input
                placeholder="Buscar por descripción..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Input
                placeholder="Precio mínimo"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input
                placeholder="Precio máximo"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </HStack>
          </Box>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={10}
            justifyItems="center"
          >
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="2xl"
                overflow="hidden"
                p={6}
                boxShadow="2xl"
                bg="white"
                maxW="360px"
                textAlign="center"
                cursor="pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setQuantity(1);
                }}
              >
                <Image
                  src={product.url}
                  alt={product.descripcion}
                  objectFit="contain"
                  width="100%"
                  height="250px"
                />
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  mt={1}
                  color="orange.500"
                >
                  ${Number(product.precio || 0).toFixed(2)}
                </Text>
                <Button
                  mt={4}
                  bgGradient="linear(to-r, #ff9a9e, #fad0c4)"
                  color="white"
                  size="lg"
                  width="full"
                  _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                >
                  🛒 Añadir al carrito
                </Button>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductsList;
