import type { Role } from "../constants/roles";

export default interface UserPayload {
  sub: string;       //Email do usuario
  id: number;
  nome: string;
  role: Role;
  cargo?: string;    
  matricula?: string;
  exp: number;       
  iat: number;
}