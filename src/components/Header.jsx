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
  VStack,
  Collapse,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import MyProfile from "./MyProfile";

export const Header = ({ onCartToggle }) => {
  const { user, logout, cart } = useAuth();
  const toast = useToast();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCartClick = () => {
    if (!user) {
      toast({
        render: () => (
          <Box color="white" p={3} bg="red.400" borderRadius="md" textAlign="center">
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
        <Flex
          position="relative"
          zIndex="1"
          align="center"
          justify="space-between"
        >
          {/* LOGO */}
          <Heading
            as="h1"
            fontFamily="'Pacifico', cursive"
            fontSize={{ base: "2xl", md: "4xl" }}
            color="white"
          >
            Sara Sáenz Cosmétics
          </Heading>

          {/* ICONOS EN MÓVIL (MENÚ + CARRITO) */}
          <HStack spacing={4} display={{ base: "flex", md: "none" }}>
            {/* CARRITO */}
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

            {/* MENÚ HAMBURGUESA */}
            <IconButton
              icon={isMenuOpen ? <FaTimes /> : <FaBars />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              color="white"
              fontSize="30px"
              _hover={{ color: "gold", transform: "scale(1.1)" }}
              transition="all 0.3s"
            />
          </HStack>

          {/* MENÚ NORMAL (ESCRITORIO) */}
          <HStack spacing={6} display={{ base: "none", md: "flex" }}>
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

        {/* MENÚ HAMBURGUESA (COLLAPSE) */}
 <Collapse in={isMenuOpen} animateOpacity>
  <VStack
    spacing={4}
    mt={4}
    bg="rgba(255, 126, 95, 0.9)"
    p={4}
    borderRadius="10px"
    display={{ base: "flex", md: "none" }} // Se muestra solo en móviles
    flexDirection="column" // Fuerza la disposición vertical
    align="center" // Centra los elementos
    width="100%" // Ocupa todo el ancho disponible
  >
    <Link
      as={RouterLink}
      to="/"
      color="white"
      fontSize="lg"
      textAlign="center"
      width="100%" // Fuerza la alineación en el centro
    >
      Home
    </Link>
    {user ? (
      <>
        <Button
          onClick={() => {
            setIsProfileOpen(true);
            setIsMenuOpen(false);
          }}
          bg="transparent"
          color="white"
          fontSize="lg"
          _hover={{ textDecoration: "underline" }}
          width="100%" // Asegura que todos ocupen el mismo espacio
          textAlign="center"
          justifyContent="center" // Centra el contenido del botón
        >
          Mis Datos
        </Button>
        <Button
          onClick={() => {
            logout();
            setIsMenuOpen(false);
          }}
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
          width="100%"
          textAlign="center"
          justifyContent="center"
        >
          Cerrar Sesión
        </Button>
      </>
    ) : (
      <>
        <Link
          as={RouterLink}
          to="/register"
          color="white"
          fontSize="lg"
          onClick={() => setIsMenuOpen(false)}
          width="100%"
          textAlign="center"
        >
          Registrarse
        </Link>
        <Link
          as={RouterLink}
          to="/login"
          color="white"
          fontSize="lg"
          onClick={() => setIsMenuOpen(false)}
          width="100%"
          textAlign="center"
        >
          Iniciar Sesión
        </Link>
      </>
    )}
  </VStack>
</Collapse>



      </Box>

      {isProfileOpen && <MyProfile onClose={() => setIsProfileOpen(false)} />}
    </Container>
  );
};

export default Header;

