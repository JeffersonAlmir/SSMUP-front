import * as yup from 'yup';
import { checkValidCpf } from '../services/checkValidCpf';

export const responsavelSchema = yup.object({
    nome: yup.string()
        .trim()
        .min(10)
        .max(50)
        .required(),
    cpf: yup.string()
        .required()
        .test(
            'cpf-check',
            'CPF inválido',
            (value: string) =>{
                if(!value) return false;
                return checkValidCpf(value);
            } 
        )
            ,
    rg: yup.string()
        .trim()
        .min(9)
        .max(9)
        .required(),
    email: yup.string()
        .trim()
        .min(5)
        .max(50)
        .required(),
    escolaridade: yup.string()
        .trim()
        .required(),
    formacao:yup.string()
        .trim(),
    especialidade:yup.string()
        .trim(),
    registroConselho:yup.string()
        .trim(),
})

interface Responsavel extends yup.InferType<typeof responsavelSchema>{};