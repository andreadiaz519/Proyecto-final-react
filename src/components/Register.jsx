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
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { registerUser, error, user } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    registerUser({ email: data.email, password: data.password });
  };

  if (user) return null; 

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p={6}
      bgGradient="linear(to-r, #ff7e5f, #feb47b)"
      borderRadius="md"
      boxShadow="lg"
      color="white"
    >
      <Heading mb={4} textAlign="center">Registro</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            placeholder="Ingresa tu correo"
            {...register("email", { required: "Campo obligatorio" })}
            bg="white"
            color="black"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              {...register("password", { required: "Campo obligatorio" })}
              bg="white"
              color="black"
            />
            <InputRightElement>
              <IconButton icon={show ? <ViewOffIcon /> : <ViewIcon />} onClick={handleClick} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={6} bg="white" color="#ff7e5f" type="submit" width="100%">
          Registrarme
        </Button>
      </form>

      {error && <Box color="red.500" mt={4}>{error}</Box>}
    </Box>
  );
};
