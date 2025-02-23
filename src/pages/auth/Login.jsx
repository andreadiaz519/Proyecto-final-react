import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  if (user) {
    return null;
  }

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p={6}
      bgGradient="linear(to-r, #ff7e5f, #feb47b)" // Degradado igual al Footer
      borderRadius="md"
      boxShadow="lg"
      color="white"
    >
      <Heading mb={4} textAlign="center">Iniciar Sesión</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            {...register("email", { required: "Este campo es obligatorio" })}
            bg="white"
            color="black"
            borderColor="white"
            focusBorderColor="white"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              {...register("password", { required: "Este campo es obligatorio" })}
              bg="white"
              color="black"
              borderColor="white"
              focusBorderColor="white"
            />
            <InputRightElement>
              <IconButton
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handleClick}
                variant="ghost"
                color="white"
                aria-label="Mostrar/Ocultar contraseña"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={6} bg="white" color="#ff7e5f" _hover={{ bg: "#feb47b" }} type="submit" width="100%">
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};
