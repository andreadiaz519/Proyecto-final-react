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
  useToast
} from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";
import CartItem from "./CartItem";
import CartDetails from "./CartDetails";

const Cart = ({ isOpen, onClose }) => {
  const { cart, setCart } = useAuth();
  const toast = useToast();

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const increaseQuantity = (id) =>
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item))
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
        description: "Agrega productos para poder comprar.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent"
      });
      return;
    }

    setCart([]);
    toast({
      title: "Compra realizada con éxito!",
      description: "Gracias por tu compra. Recibirás un correo con los detalles.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      variant: "left-accent"
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.precio || 0) * (item.quantity || 1), 0);

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
          <CartDetails totalPrice={totalPrice} handlePurchase={handlePurchase} onClose={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
