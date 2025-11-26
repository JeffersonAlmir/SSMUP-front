import type IResponseItens from "./IResponseItens";

export default interface IResponseEmpresa {
  content: IResponseItens[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}