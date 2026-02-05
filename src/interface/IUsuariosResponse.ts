import type { Role } from "../constants/roles";

export default interface IUsuariosResponse{
    id: number;
    nome: string;
    email: string;
    cargo: string;
    matricula: string;
    role: Role;
    ativo: boolean;  
}