/// src/components/Register.jsx
import { useState } from "react";
import { Box, 
        Button, 
        FormControl, 
        FormErrorMessage, 
        FormLabel, 
        Input, InputGroup, 
        InputRightElement 
      } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";  // Asegúrate de que esta ruta sea correcta

export const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { registerUser, error } = useAuth();  // Asegúrate de que esto esté funcionando

  const onSubmit = (data) => {
    const { username, password } = data;  // Asegúrate de usar los nombres correctos
    registerUser({ email: username, password });  // Llamar a registerUser desde el contexto
  };

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor="username">Correo electrónico</FormLabel>
          <Input
            type="email"
            id="username"
            placeholder="Ingresa tu correo electrónico"
            {...register("username", { required: "Este campo es obligatorio" })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              {...register("password", { required: "Este campo es obligatorio" })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit" width="100%">
          Registrarme
        </Button>
      </form>

      {error && <Box color="red.500" mt={4}>{error}</Box>}  {/* Muestra los errores */}
    </Box>
  );
};
