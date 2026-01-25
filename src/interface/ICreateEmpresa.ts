import type IEndereco from "./IEndereco"
import type IResponsavel from "./IResponsavel";

export default interface ICreateEmpresa{
    id?: number;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual: string;
    atividadeFirma: string;
    subAtividade: string;
    dataInicioFuncionamento: string;
    ativo?: boolean;
    email: string;
    cnaeCodigo: String ;
    responsavel: IResponsavel,
    endereco: IEndereco,
}