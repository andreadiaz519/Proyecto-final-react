import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Image,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";

const Cart = ({ isOpen, onClose }) => {
  const { cart, setCart } = useAuth();

  console.log("Contenido del carrito:", cart);

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = (item.quantity || 1) - 1;
            return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice = typeof item.precio === "number" ? item.precio : 0;
    const qty = item.quantity || 1;
    return sum + itemPrice * qty;
  }, 0);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
      <DrawerOverlay bg="blackAlpha.600" />
      <DrawerContent borderRadius="md" overflow="hidden">
        <DrawerCloseButton />
        <DrawerHeader
          bgGradient="linear(to-r, #ff7e5f, #feb47b)"
          color="white"
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
        >
          Carrito de Compras
        </DrawerHeader>
        <DrawerBody p={4} bg="gray.50">
          <VStack spacing={4} align="stretch">
            {cart.length === 0 ? (
              <Text>No hay productos en el carrito.</Text>
            ) : (
              cart.map((item) => (
                <Box key={item.id} p={3} bg="white" borderRadius="md" boxShadow="sm">
                  <HStack spacing={4} align="center">
                    <Image
                      src={
                        item.url ||
                        "https://dummyimage.com/50x50/cccccc/ffffff.png"
                      }
                      alt={item.descripcion || "Producto"}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontWeight="bold">
                        $
                        {typeof item.precio === "number"
                          ? item.precio.toFixed(2)
                          : "0.00"}
                      </Text>
                      <HStack>
                        <Button
                          size="xs"
                          onClick={() => decreaseQuantity(item.id)}
                          colorScheme="gray"
                        >
                          -
                        </Button>
                        <Text>{item.quantity || 1}</Text>
                        <Button
                          size="xs"
                          onClick={() => increaseQuantity(item.id)}
                          colorScheme="gray"
                        >
                          +
                        </Button>
                      </HStack>
                    </VStack>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        </DrawerBody>
        <DrawerFooter p={4} bg="gray.100">
          <VStack spacing={4} w="100%">
            <Text fontWeight="bold" mb={2} w="100%" textAlign="center">
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <HStack spacing={4} w="100%">
              <Button
                flex="1"
                bgGradient="linear(to-r, #ff7e5f, #feb47b)"
                color="white"
                _hover={{ bgGradient: "linear(to-r, #ff7e5f, #feb47b)" }}
                borderRadius="md"
                size="md"
                onClick={() => alert("¡Compra realizada con éxito!")}
              >
                Comprar
              </Button>
              <Button
                flex="1"
                variant="outline"
                borderRadius="md"
                fontSize="sm"
                color="gray.700"
                borderColor="gray.400"
                onClick={onClose}
              >
                Seguir Comprando
              </Button>
            </HStack>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
