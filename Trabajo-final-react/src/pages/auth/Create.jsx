import { useState } from "react";
import { createTodo } from "../../services/todos";
import { useAuth } from "../../Context/AuthContext";  
import { Box, Button, Heading, Input } from "@chakra-ui/react";

export const Create = () => {
  const [values, setValues] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  console.log("Usuario autenticado:", user);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.uid) {
      console.error(" Error: Usuario no autenticado o UID no disponible", user);
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const todo = await createTodo(values.name, user.uid); 
      console.log("Todo creado:", todo);
      setValues({ name: "" });
      setError(false);
    } catch (error) {
      setError(true);
      console.error(" Error al crear el todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb="6" textAlign="center">
        Create Todo
      </Heading>
      <form onSubmit={onSubmit}>
        <div>
          <Input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter todo name"
          />
        </div>
        {error && <p style={{ color: "red" }}>There was an error</p>}
        <Button m={2} type="submit" isLoading={loading}>
          Crear Todo
        </Button>
      </form>
    </Box>
  );
};
