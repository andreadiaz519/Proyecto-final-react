import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header";
import Routing from "./routes/Routing";
import { ProductsList } from "./components/ProductsList";
import Footer from "./components/Footer";
import { AuthProvider } from "./Context/AuthContext";
import Cart from "./components/Cart";
import MyProfile from "./components/MyProfile";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  console.log("App.jsx está renderizando");

  return (
    <AuthProvider>
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        bgImage="url(https://www.uzonepackaging.com/wp-content/uploads/2024/04/beauty-overconsumption-e1713152475260.jpg)"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="relative"
        p={4}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgGradient: "linear(to-b, rgba(255, 182, 193, 0.5), rgba(255, 105, 180, 0.8))",
          zIndex: -1,
        }}
      >
        <Header 
          onCartToggle={() => setIsCartOpen(!isCartOpen)} 
          onProfileToggle={() => setIsProfileOpen(true)}
        />
        
        <Box flex="1" mt={6}>
          <Routing />
          {!isProfileOpen && <ProductsList />} 
        </Box>

        {isProfileOpen && <MyProfile onClose={() => setIsProfileOpen(false)} />} 

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default App;
