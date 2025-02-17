import { useEffect, useState } from "react";
import { getTodos, getUserTodos } from "../services/todos"; // Asegúrate de que esta función existe
import { Box, VStack, Text } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { user } = useAuth();
    

    useEffect(() => {
        const getData = async () => {
            try { 
                const data = await getTodos(user); 
                data.map((todo) => console.log(todo));
                setTodos(data);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            getData();
        }
        
    }, []); 

    console.log(todos);

    return (
        <Box>
            {error && <Text color="red.500">Hubo un error</Text>}
            {loading && <Text>Cargando...</Text>}
            
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <VStack key={todo.id}>
                        <Text>{todo.name}</Text>
                    </VStack>
                ))
            ) : (
                <Text>No hay datos</Text> // Corregido: `<Text>` en lugar de `<text>`
            )}
        </Box>
    );
};

export default Home;
