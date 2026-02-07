import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./src/pages/Inicio";
import { Layout } from "./src/layout/Layout";
import Painel from "./src/pages/Painel";
import Alvara from "./src/pages/Alvara";
import Configuracoes from "./src/pages/Configuracoes";
import Cadastro from "./src/pages/Cadastro";
import ListEmpresas from "./src/pages/ListEmpresa";
import Login from "./src/pages/Login";
import DetailsPage from "./src/pages/DetailsPage";
import UpdateEmpresaProvider from "./src/contexts/UpdateEmpresaContext";
import { PrivateRoute } from "./src/components/login/PrivateRoute";
import MembrosPage from "./src/pages/MembrosPage";
import MembrosPageProvider from "./src/contexts/MembrosPageContext";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route element ={<Layout/>}>
              <Route path="/" element={<Inicio />} />
              <Route path="/painel" element = {<Painel/>} />
              <Route path="/cadastro" element={<Cadastro/>} />
              <Route path="/lista" element={<ListEmpresas/>} />
              <Route path="/alvara" element={<Alvara/>} />
              <Route path="/configuracoes" element={<Configuracoes/>} />        
              <Route 
                path="/membros" 
                element={ 
                  <MembrosPageProvider> 
                    <MembrosPage/>
                  </MembrosPageProvider> 
                } 
              />        
              <Route 
                path="/detalhes/:cnpj"
                element={
                  <UpdateEmpresaProvider> 
                    <DetailsPage/> 
                  </UpdateEmpresaProvider>
                } 
              />        
          </Route>
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
