// src/pages/auth/Login.jsx
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext"; // Asegura que la ruta sea correcta
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario

export const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate(); // Hook para redirigir

  // Inicializamos react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Obtenemos la función login y el usuario desde el AuthContext
  const { login, user } = useAuth();

  // Si el usuario ya está logueado, lo redirigimos al Home
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirige a la página principal
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  // Si el usuario ya está autenticado, no muestra el formulario
  if (user) {
    return null;
  }

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo para el correo electrónico */}
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Correo electrónico</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Campo para la contraseña */}
        <FormControl isInvalid={errors.password} mt={4}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              {...register("password", { required: "Este campo es obligatorio" })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Ocultar" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {/* Botón para enviar el formulario */}
        <Button mt={4} colorScheme="teal" type="submit" width="100%">
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};
