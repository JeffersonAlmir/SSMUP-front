import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./src/pages/Inicio";
import { Layout } from "./src/layout/Layout";
import Painel from "./src/pages/Painel";
import Alvara from "./src/pages/Alvara";
import Configuracoes from "./src/pages/Configuracoes";
import Cadastro from "./src/pages/Cadastro";
import ListEmpresas from "./src/pages/ListEmpresa";
import Login from "./src/pages/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route element ={<Layout/>}>
            <Route path="/" element={<Inicio />} />
            <Route path="/painel" element = {<Painel/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/lista" element={<ListEmpresas/>} />
            <Route path="/alvara" element={<Alvara/>} />
            <Route path="/configuracoes" element={<Configuracoes/>} />        
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
