import type IEmpresa from "./IEmpresa";

export default interface IResponseEmpresa {
  items: IEmpresa[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}