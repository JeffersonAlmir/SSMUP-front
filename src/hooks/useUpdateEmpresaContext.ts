import { useContext } from "react"
import { UpdateEmpresaContext } from "../contexts/UpdateEmpresaContext"

export function useUpdateEmpresaContext() {
  const context = useContext(UpdateEmpresaContext);
  if (!context) {
    throw new Error('useUpdateEmpresaContext deve ser usado dentro do UpdateEmpresaProvider');
  }
  return context;
}