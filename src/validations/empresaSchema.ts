import * as yup from 'yup';
import { responsavelSchema } from './responsavelSchema';
import { enderecoSchema } from './enderecoSchema';

export const empresaSchema = yup.object({
    razaoSocial: yup.string()
        .trim()
        .min(5)
        .max(50)
        .required(),
    nomeFantasia:yup.string()
        .trim()
        .min(9)
        .max(50)
        .required(),
    cpfCnpj: yup.string()
        .trim()
        .required("CPF ou CNPJ é obrigatório"),
    inscricaoEstadual:yup.string()
        .trim()
        .min(9)
        .max(9)
        .required(),
    atividadeFirma:yup.string()
        .trim()
        .min(5)
        .max(50)
        .required(),
    subAtividade:yup.string()
        .trim()
        .min(5)
        .max(50)
        .required(),
    dataInicioFuncionamento:yup.date()
        .required(),
    endereco: enderecoSchema
        .required(),
    responsavel:responsavelSchema
        .required(), 
})

