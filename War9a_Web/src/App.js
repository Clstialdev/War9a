import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
import { Documentation } from "./pages/Documentation";
import { Join } from "./pages/Join";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

function App() {
  const firebaseConfig = {
    apiKey: "Hidden to protect our project",
    authDomain: "Hidden to protect our project",
    projectId: "Hidden to protect our project",
    storageBucket: "Hidden to protect our project",
    messagingSenderId: "Hidden to protect our project",
    appId: "Hidden to protect our project",
  };

  const Firebase = initializeApp(firebaseConfig);

  const db = getFirestore(Firebase);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" exact element={<Home />} />
          {/* <Route path="/book/filter" element={<Book db={db}/>} /> */}
          <Route path="/book" element={<Book db={db} />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/documentation/:type" element={<Documentation />} />
          <Route path="/join/:id" element={<Join db={db} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
