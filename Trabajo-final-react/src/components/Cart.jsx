import React from "react";
import { useAuth } from "../Context/AuthContext";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Cart = ({ isOpen, onClose }) => {
  const { cart, setCart } = useAuth();

  const eliminarProducto = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Box
      position="fixed"
      top="0"
      right={isOpen ? "0" : "-100%"}
      w="350px"
      h="100vh"
      bg="white"
      p={5}
      boxShadow="xl"
      transition="right 0.3s ease-in-out"
      overflowY="auto"
    >
      <HStack justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">🛒 Carrito de Compras</Text>
        <IconButton icon={<CloseIcon />} aria-label="Cerrar" size="sm" onClick={onClose} />
      </HStack>

      <VStack spacing={4} align="stretch">
        {cart.length === 0 ? (
          <Text textAlign="center">El carrito está vacío</Text>
        ) : (
          cart.map((item) => (
            <HStack key={item.id} justify="space-between">
              <Image src={item.url} alt={item.nombre} boxSize="50px" />
              <Text>{item.nombre}</Text>
              <Text fontWeight="bold">${item.precio}</Text>
              <IconButton
                icon={<CloseIcon />}
                aria-label="Eliminar"
                size="sm"
                onClick={() => eliminarProducto(item.id)}
              />
            </HStack>
          ))
        )}
      </VStack>

      <Button mt={4} w="100%" colorScheme="teal">
        Finalizar Compra
      </Button>
    </Box>
  );
};

export default Cart;
