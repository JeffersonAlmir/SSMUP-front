export default interface UserPayload {
  sub: string;       //Email do usuario
  id: number;
  nome: string;
  role: 'ADMIN' | 'USER';
  cargo?: string;    
  matricula?: string;
  exp: number;       
  iat: number;
}