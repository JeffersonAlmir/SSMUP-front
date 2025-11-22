import type IEmpresa from "./IEmpresa";
import type IEndereco from "./IEndereco"
import type IResponsavel from "./IResponsavel";

export default interface IResponseItens{
    empresa:IEmpresa,
    responsavel: IResponsavel,
    endereco: IEndereco,
}