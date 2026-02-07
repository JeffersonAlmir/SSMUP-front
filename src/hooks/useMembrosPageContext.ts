import { useContext } from "react"
import { MembrosPageContext } from "../contexts/MembrosPageContext"

export const useMembrosPageContext = () =>{
    return useContext(MembrosPageContext);
}