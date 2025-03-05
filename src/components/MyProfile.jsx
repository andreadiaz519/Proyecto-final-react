import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Icon,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { MdCake, MdEmail } from "react-icons/md";

const MyProfile = ({ onClose }) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const { isOpen, onOpen, onClose: closeDialog } = useDisclosure();
  const [dialogMessage, setDialogMessage] = useState("");

  if (!user) return null;

  const handleUpdate = async () => {
    try {
      await updateProfile(user, { displayName });
      setDialogMessage("Datos actualizados correctamente");
    } catch (error) {
      setDialogMessage("Error al actualizar: " + error.message);
    }
    onOpen();
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
      <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
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
        <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
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

      {/* AlertDialog de Chakra UI */}
      <AlertDialog isOpen={isOpen} onClose={closeDialog} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="lg" boxShadow="lg" bgGradient="linear(to-r, #ff7e5f, #feb47b)">
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white" textAlign="center">
              Notificación
            </AlertDialogHeader>
            <AlertDialogBody fontSize="md" color="white" textAlign="center">
              {dialogMessage}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={closeDialog} colorScheme="whiteAlpha" variant="solid" width="full">
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MyProfile;

