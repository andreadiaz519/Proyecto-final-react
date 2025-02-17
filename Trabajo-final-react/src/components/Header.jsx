import React from "react";
import { Box, Flex, Heading, Button, Link, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <Box
      position="relative"
      bgGradient="linear(to-r, #ff7e5f, #feb47b)" // Fondo degradado
      py={4}
      px={8}
      boxShadow="lg"
    >
      {/* Marca de agua: imagen de fondo con baja opacidad */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgImage="url('https://i.pinimg.com/736x/8b/30/f5/8b30f59ca33eaed3db75185f5cd43ef7.jpg')"  // Asegúrate de que la imagen esté en public/images/
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        opacity="0.2"
        zIndex="0"
      />
      <Flex
        position="relative"
        zIndex="1"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
      >
        <Heading
          as="h1"
          fontFamily="'Pacifico', cursive" // Fuente cursiva elegante
          fontSize={{ base: "2xl", md: "4xl" }}
          color="white"
          textAlign="center"
          flex="1"
        >
          Sara Sáenz Cosmétics
        </Heading>
        <HStack spacing={6} mt={{ base: 4, md: 0 }}>
          <Link as={RouterLink} to="/" color="white" fontSize="lg">
            Home
          </Link>
          <Link as={RouterLink} to="/register" color="white" fontSize="lg">
            Registrarme
          </Link>
          <Link as={RouterLink} to="/login" color="white" fontSize="lg">
            Iniciar Sesión
          </Link>
          <Button onClick={logout} colorScheme="teal" variant="outline">
            Cerrar Sesión
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
