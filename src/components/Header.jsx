import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Link,
  HStack,
  IconButton,
  Badge,
  Container,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import MyProfile from "./MyProfile"; 

export const Header = ({ onCartToggle }) => {  
  const { user, logout, cart } = useAuth();
  const toast = useToast();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleCartClick = () => {
    if (!user) {
      toast({
        render: () => (
          <Box
            color="white"
            p={3}
            bgGradient="linear(to-r, #ff7e5f, #feb47b)"
            borderRadius="md"
            textAlign="center"
          >
           ⚠️ Regístrate para comprar nuestros productos
          </Box>
        ),
      });
    } else {
      onCartToggle();
    }
  };

  return (
    <Container maxW="container.xl" px={4}>
      <Box
        position="relative"
        bgGradient="linear(to-r, #ff7e5f, #feb47b)"
        py={5} 
        px={8}
        boxShadow="lg"
        borderRadius="15px"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgImage="url('https://i.pinimg.com/736x/8b/30/f5/8b30f59ca33eaed3db75185f5cd43ef7.jpg')"
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          opacity="0.2"
          borderRadius="15px"
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
            fontFamily="'Pacifico', cursive"
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
            {user ? (
              <>
                <Button
                  onClick={() => setIsProfileOpen(true)}
                  bg="transparent"
                  color="white"
                  fontSize="lg"
                  _hover={{ textDecoration: "underline" }}
                >
                  Mis Datos
                </Button>
                <Button
                  onClick={logout}
                  bgGradient="linear(to-r, #ff7e5f, #feb47b)"
                  color="white"
                  px={6}
                  py={3}
                  fontSize="md"
                  borderRadius="30px"
                  _hover={{
                    bgGradient: "linear(to-r, #feb47b, #ff7e5f)",
                    transform: "scale(1.05)",
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link as={RouterLink} to="/register" color="white" fontSize="lg">
                  Registrarse
                </Link>
                <Link as={RouterLink} to="/login" color="white" fontSize="lg">
                  Iniciar Sesión
                </Link>
              </>
            )}
            <Box position="relative">
              <IconButton
                icon={<FaShoppingCart />}
                onClick={handleCartClick}
                variant="ghost"
                color="white"
                fontSize="30px"
                _hover={{ color: "gold", transform: "scale(1.1)" }}
                transition="all 0.3s"
              />
              {cart.length > 0 && (
                <Badge
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  bg="red.500"
                  color="white"
                  borderRadius="full"
                  fontSize="xs"
                  px="2"
                  boxShadow="0 0 10px rgba(255, 0, 0, 0.7)"
                >
                  {cart.length}
                </Badge>
              )}
            </Box>
          </HStack>
        </Flex>
      </Box>
      
      
      {isProfileOpen && <MyProfile onClose={() => setIsProfileOpen(false)} />}
    </Container>
  );
};

export default Header;
