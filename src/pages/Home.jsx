import { useEffect, useState } from "react";
import { getTodos } from "../services/todos";  // Asegúrate de que esta función obtenga correctamente los productos
import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";  // Importamos useLocation para saber la ruta actual

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const location = useLocation();  // Para saber en qué ruta estamos

  const [showProductList, setShowProductList] = useState(true);  // Controlar la visibilidad de la lista de productos

  useEffect(() => {
    // Cambia la visibilidad de la lista de productos según la ruta
    if (location.pathname.includes("/productos/")) {
      setShowProductList(false);  // Oculta la lista si estamos en un producto individual
    } else {
      setShowProductList(true);  // Muestra la lista si estamos en la página principal
    }
  }, [location]);  // Este efecto se ejecuta cada vez que cambie la ruta

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
      {showProductList && todos.length > 0 ? (  // Solo mostrar la lista si showProductList es true
        todos.map((todo) => (
          <VStack key={todo.id} p={2}>
            <Text>{todo.name}</Text>
            <a href={`/productos/${todo.id}`}>Ver más</a>  {/* Enlace para ir a la página del producto */}
          </VStack>
        ))
      ) : (
        <Text></Text>
      )}
    </Box>
  );
};

export default Home;
