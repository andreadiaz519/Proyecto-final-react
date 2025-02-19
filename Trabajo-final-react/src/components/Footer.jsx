import { Box, Flex, Text, Link, Icon, VStack, Divider, HStack } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      position="relative"
      bgGradient="linear(to-r, #ff7e5f, #feb47b)" // Mismo degradado del Header
      color="white"
      py={6}
      textAlign="center"
      boxShadow="lg"
    >
      {/* Marca de agua: imagen de fondo con baja opacidad */}
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
        zIndex="0"
      />

      {/* Contenedor centrado con contenido en primer plano */}
      <Flex direction="column" align="center" maxW="900px" mx="auto" position="relative" zIndex="1">
        {/* Sección de Información */}
        <VStack spacing={3} mb={4}>
          <Text fontSize="2xl" fontWeight="bold"> {/* Aumentamos el tamaño de la fuente */}
            Sara Sáenz Cosmétics
          </Text>
          <HStack spacing={4}>
            <Flex align="center">
              <Icon as={FaMapMarkerAlt} mr={2} />
              <Text fontSize="sm">Armenia, Colombia</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaPhone} mr={2} />
              <Text fontSize="sm">+57 3126578954</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaEnvelope} mr={2} />
              <Text fontSize="sm">contacto@sarasaenz.com</Text>
            </Flex>
          </HStack>
        </VStack>

        <Divider borderColor="whiteAlpha.600" w="80%" my={3} />

        {/* Redes Sociales */}
        <HStack spacing={6}>
          <Link href="https://facebook.com" isExternal>
            <Icon as={FaFacebook} w={6} h={6} _hover={{ transform: "scale(1.2)", color: "#3b5998" }} />
          </Link>
          <Link href="https://instagram.com" isExternal>
            <Icon as={FaInstagram} w={6} h={6} _hover={{ transform: "scale(1.2)", color: "#E1306C" }} />
          </Link>
          <Link href="https://twitter.com" isExternal>
            <Icon as={FaTwitter} w={6} h={6} _hover={{ transform: "scale(1.2)", color: "#1DA1F2" }} />
          </Link>
          <Link href="https://wa.me/573126578954" isExternal> {/* Agregado enlace de WhatsApp */}
            <Icon as={FaWhatsapp} w={6} h={6} _hover={{ transform: "scale(1.2)", color: "#25D366" }} />
          </Link>
        </HStack>

        <Text fontSize="sm" mt={4} opacity="0.8">
          © {new Date().getFullYear()} Sara Sáenz Cosmétics. Todos los derechos reservados.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
