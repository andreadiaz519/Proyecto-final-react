// src/App.jsx
import React from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header";
import Routing from "./routes/Routing";
import { ProductsList } from "./components/ProductsList";



function App() {
  return (
    <Box
      minH="100vh" 
      bgImage="url(https://www.uzonepackaging.com/wp-content/uploads/2024/04/beauty-overconsumption-e1713152475260.jpg)" // Ruta local de la imagen
      bgSize="cover" 
      bgPosition="center" 
      bgRepeat="no-repeat" 
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgGradient: "linear(to-b, rgba(255, 182, 193, 0.5), rgba(255, 105, 180, 0.8))", // Degradado rosa con transparencia
        zIndex: -1, 
      }}
      position="relative" 
      p={4} // Espaciado
    >
      <Header />
      <Box mt={6}>
        <Routing />
        <ProductsList/>
      </Box>
    </Box>
  );
}

export default App;
