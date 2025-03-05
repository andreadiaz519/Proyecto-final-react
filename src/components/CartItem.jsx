import React from "react";
import { Box, HStack, VStack, Image, Text, Button } from "@chakra-ui/react";

const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    <Box p={3} bg="white" borderRadius="md" boxShadow="sm">
      <HStack spacing={4} align="center">
        <Image
          src={item.url || "https://dummyimage.com/50x50/cccccc/ffffff.png"}
          alt={item.descripcion || "Producto"}
          boxSize="50px"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack align="start" spacing={1} flex="1">
        <Text fontSize="lg" fontWeight="bold" color="orange.500">
  ${Number(item.precio || 0).toFixed(2)}
        </Text>

          <HStack>
            <Button size="xs" onClick={() => decreaseQuantity(item.id)} colorScheme="gray">
              -
            </Button>
            <Text>{item.quantity || 1}</Text>
            <Button size="xs" onClick={() => increaseQuantity(item.id)} colorScheme="gray">
              +
            </Button>
          </HStack>
        </VStack>
        <Button size="xs" colorScheme="red" onClick={() => removeFromCart(item.id)}>
          Eliminar
        </Button>
      </HStack>
    </Box>
  );
};

export default CartItem;
