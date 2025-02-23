import { Box, Flex, Text, Link, Icon, VStack, Divider, HStack, Stack } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r, #ff7e5f, #feb47b)"
      color="white"
      py={6}
      textAlign="center"
      boxShadow="lg"
      position="relative"
    >
      {/* Marca de agua */}
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

      {/* Contenedor de contenido */}
      <Flex direction="column" align="center" maxW="1100px" mx="auto" position="relative" zIndex="1" px={4}>
        
        {/* Información */}
        <VStack spacing={3} mb={4}>
          <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
            Sara Sáenz Cosmétics
          </Text>

          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            align="center"
            textAlign="center"
          >
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
          </Stack>
        </VStack>

        <Divider borderColor="whiteAlpha.600" w="80%" my={3} />

        {/* Redes Sociales */}
        <HStack spacing={6} wrap="wrap" justify="center">
          <Link href="https://facebook.com" isExternal>
            <Icon as={FaFacebook} w={6} h={6} _hover={{ transform: "scale(1.2)", color: "#3b5998" }} />
          </Link>
          <Link href="https://instagram.com" isExternal>
            <Icon as={FaInstagram} w={6} h={6} _hover={{ transform: "scale(1.2)", color: "#E1306C" }} />
          </Link>
          <Link href="https://twitter.com" isExternal>
            <Icon as={FaTwitter} w={6} h={6} _hover={{ transform: "scale(1.2)", color: "#1DA1F2" }} />
          </Link>
          <Link href="https://wa.me/573126578954" isExternal>
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
