import React, { useState } from "react";
import { Box, Text, Button, Input, FormControl, FormLabel, Icon } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { MdCake } from "react-icons/md"; // Icono de cumpleaños
import { MdEmail } from "react-icons/md"; // Icono de correo electrónico (cartita)

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
      width="90%" 
      maxW="500px"
      mx="auto"
      mt={10}  
      p={5} 
      bg="white"
      borderRadius="md" 
      boxShadow="md"  
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="1000"
    >
      <Text 
        fontSize="xl"  
        fontWeight="bold" 
        textAlign="center" 
        mb={4}  
      >
        Mi Perfil
      </Text>
      <FormControl mb={3}>  
        <FormLabel>Nombre</FormLabel>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Tu nombre"
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Email <Icon as={MdEmail} ml={2} /></FormLabel>
        <Input value={user.email} isReadOnly />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Fecha de nacimiento <Icon as={MdCake} ml={2} /></FormLabel>
        <Input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)} 
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