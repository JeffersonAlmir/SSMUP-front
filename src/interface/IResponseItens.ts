import type IEndereco from "./IEndereco"
import type IResponsavel from "./IResponsavel";

export default interface IResponseItens{
    id: number;
    razaoSocial: string;
    nomeFantasia: string;
    cpfCnpj: string;
    inscricaoEstadual: string;
    atividadeFirma: string;
    subAtividade: string;
    dataInicioFuncionamento: string;
    ativo: boolean;
    responsavel: IResponsavel,
    endereco: IEndereco,
}