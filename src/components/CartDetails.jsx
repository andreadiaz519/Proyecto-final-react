import React from "react";
import { VStack, Text, HStack, Button } from "@chakra-ui/react";

const CartDetails = ({ totalPrice, handlePurchase, onClose }) => {
  return (
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
          onClick={handlePurchase}
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
  );
};

export default CartDetails;
