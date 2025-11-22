import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./src/pages/Inicio";
import { Layout } from "./src/layout/Layout";
import Painel from "./src/pages/Painel";
import Empresas from "./src/pages/Empresas";
import Alvara from "./src/pages/Alvara";
import Configuracoes from "./src/pages/Configuracoes";
import Cadastro from "./src/pages/Cadastro";
import ListEmpresas from "./src/pages/ListEmpresa";

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
      </Routes>
    </BrowserRouter>
  );
}
