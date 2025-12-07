import { useContext } from "react"
import { UpdateEmpresaContext } from "../contexts/UpdateEmpresaContext"

export const useUpdateEmpresaContext = () => {
    return useContext(UpdateEmpresaContext);
}