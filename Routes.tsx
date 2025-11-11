import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./src/pages/Inicio";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}
