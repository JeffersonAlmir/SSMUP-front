import * as yup from 'yup';
import { checkValidCpf } from '../utils/checkValidCpf';

export const responsavelSchema = yup.object({
    nome: yup.string()
        .trim()
        .min(10, 'O nome deve ter no mínimo 10 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres')
        .required('O campo nome é obrigatório'),

    cpf: yup.string()
        .trim()
        .required('O campo CPF é obrigatório')
        .test(
            'cpf-check',
            'CPF inválido',
            (value: string) => {
                if(!value) return true;
                return checkValidCpf(value);
            }
        ),
    rg: yup.string()
        .trim()
        .length(9, 'O RG deve ter exatamente 9 caracteres') 
        .required('O campo RG é obrigatório'),

    escolaridade: yup.string()
        .trim()
        .required('O campo escolaridade é obrigatório'),
    formacao: yup.string()
        .trim(),

    especialidade: yup.string()
        .trim(),

    registroConselho: yup.string()
        .trim(),
});

