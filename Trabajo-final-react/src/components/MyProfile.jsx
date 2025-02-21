import React, { useState } from "react";
import { Box, Text, Button, Input, FormControl, FormLabel, Icon } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { MdCake } from "react-icons/md"; // Ícono de cumpleaños
import { MdEmail } from "react-icons/md"; // Ícono de correo electrónico (cartita)

const MyProfile = ({ onClose }) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");

  if (!user) return null;

  const handleUpdate = async () => {
    try {
      await updateProfile(user, { displayName });
      alert("Datos actualizados correctamente");
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    }
  };

  return (
    <Box
      width="90%"  // Usamos un 90% del ancho disponible
      maxW="500px"  // Limite máximo a 500px
      mx="auto"
      mt={10}  // Espaciado superior pequeño
      p={5}  // Padding ajustado
      bg="white"
      borderRadius="md"  // Borde suave
      boxShadow="md"  // Sombra ligera
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="1000"
    >
      <Text 
        fontSize="xl"  // Aumenté el tamaño del título
        fontWeight="bold"  // Negrita
        textAlign="center"  // Centrado
        mb={4}  // Espaciado inferior
      >
        Mi Perfil
      </Text>
      <FormControl mb={3}>  {/* Espaciado entre los campos */}
        <FormLabel>Nombre</FormLabel>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Tu nombre"
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Email <Icon as={MdEmail} ml={2} /></FormLabel> {/* Ícono de correo */}
        <Input value={user.email} isReadOnly />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Fecha de nacimiento <Icon as={MdCake} ml={2} /></FormLabel> {/* Ícono de cumpleaños */}
        <Input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)} // Actualiza el estado con la fecha
        />
      </FormControl>
      <Button
        onClick={handleUpdate}
        width="full"
        bgGradient="linear(to-r, #ff7e5f, #feb47b)"
        color="white"
        _hover={{ bgGradient: "linear(to-r, #ff7e5f, #feb47b)" }}
      >
        Actualizar Datos
      </Button>
      <Button
        onClick={onClose}
        width="full"
        mt={4}
        variant="outline"
        borderColor="gray.400"
        color="gray.700"
        fontSize="sm"
      >
        Cerrar
      </Button>
    </Box>
  );
};

export default MyProfile;
