import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import './App.css'
import Autores from "./components/Autores";
import Navbars from "./Navbars/Navbars";
import Libros from "./components/Libros";

function App() {

  return (
    <BrowserRouter>
    <Navbars/>
      <Routes>
        <Route path="/" element={<Autores />} />
        <Route path="/libros" element={<Libros />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
