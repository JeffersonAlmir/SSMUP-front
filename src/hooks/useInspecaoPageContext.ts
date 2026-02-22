import { useContext } from "react"
import { InspecaoPageContext } from "../contexts/InspecaoPageContext"

export const useInspecaoPageContext = () => {
    const context = useContext(InspecaoPageContext); 
    if (!context) { 
        throw new Error("useInspecaoPageContext deve ser usado dentro de InspecaoPageProvider"); 
    } 
    return context;
}