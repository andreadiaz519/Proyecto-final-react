import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  useToast,
  Button,
  HStack,
} from "@chakra-ui/react";
import { BiCheckCircle } from "react-icons/bi"; // ✅ Ícono bonito

import { useAuth } from "../Context/AuthContext";
import CartItem from "./CartItem";

const Cart = ({ isOpen, onClose }) => {
  const { cart, setCart } = useAuth();
  const toast = useToast();

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const increaseQuantity = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );

  const decreaseQuantity = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
      )
    );

  const handlePurchase = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de comprar.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setCart([]); // Vaciar carrito
    toast({
      duration: 4000,
      isClosable: true,
      position: "top-right",
      render: () => (
        <HStack
          bgGradient="linear(to-r, #FF7E5F, #FEB47B)" // ✅ Color exacto de tu página
          color="white"
          p={3}
          borderRadius="md"
          fontWeight="bold"
          spacing={2}
        >
          <BiCheckCircle size="24px" /> {/* ✅ Ícono agregado */}
          <Text>Gracias por tu compra.</Text>
        </HStack>
      ),
    });
    onClose();
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.precio || 0) * (item.quantity || 1), 0);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
      <DrawerOverlay bg="blackAlpha.600" />
      <DrawerContent borderRadius="md" overflow="hidden">
        <DrawerCloseButton />
        <DrawerHeader
          bgGradient="linear(to-r, #FF7E5F, #FEB47B)" // ✅ Color exacto corregido
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
                <CartItem
                  key={item.id}
                  item={item}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                />
              ))
            )}
          </VStack>
        </DrawerBody>
        <DrawerFooter p={4} bg="gray.100">
          <VStack w="100%">
            <Text fontWeight="bold">Total: ${totalPrice.toFixed(2)}</Text>
            <Button
              w="100%"
              bgGradient="linear(to-r, #FF7E5F, #FEB47B)" // ✅ Color exacto corregido
              color="white"
              _hover={{ bgGradient: "linear(to-r, #FF7E5F, #FEB47B)" }}
              onClick={handlePurchase}
            >
              Comprar
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
