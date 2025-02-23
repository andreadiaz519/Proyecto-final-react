import { useEffect, useState } from "react";
import { getTodos } from "../services/todos";
import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    
    if (!user) {
      setLoading(false);
      return;
    }

    const getData = async () => {
      try {
        const data = await getTodos(user);
        setTodos(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [user]);

  
  if (!user) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        textAlign="center"
        flexDirection="column"
      >
        <Heading
          fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          fontFamily="'Dancing Script', cursive"
          color="white"
          textShadow="2px 2px 10px rgba(0, 0, 0, 0.5)"
          p={4}
        >
          🔥 ¡Regístrate e inicia sesión <br /> para ver nuestros productos! ✨
        </Heading>
        <Text
          fontSize="xl"
          color="white"
          textShadow="1px 1px 8px rgba(0, 0, 0, 0.5)"
        >
          Descubre lo mejor de nuestra tienda 🛍️
        </Text>
      </Box>
    );
  }

  if (loading) return <Box>Cargando...</Box>;
  if (error) return <Box color="red.500">Hubo un error</Box>;

  return (
    <Box>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <VStack key={todo.id} p={2}>
            <Text>{todo.name}</Text>
          </VStack>
        ))
      ) : (
        <Text></Text>
      )}
    </Box>
  );
};

export default Home;
