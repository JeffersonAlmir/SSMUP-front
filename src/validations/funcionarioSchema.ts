import * as yup from 'yup';

export const funcionarioSchema = yup.object({
    nome: yup.string()
        .trim()
        .min(10, 'O nome deve ter no mínimo 10 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres')
        .required('O campo nome é obrigatório'),

    email: yup.string()
        .trim()
        .email('Digite um email válido') 
        .required('O campo email é obrigatório'),
    cargo: yup.string()
        .trim()
        .min(1, 'O cargo deve ter no mínimo 10 caracteres')
        .max(20, 'O cargo deve ter no máximo 50 caracteres')
        .required('O campo nome é obrigatório'),
    matricula: yup.string()
        .trim()
        .min(10, 'A matrícula deve ter no mínimo 10 caracteres')
        .max(20, 'A matrícula deve ter no máximo 20 caracteres')
        .required('O campo matrícula é obrigatório'),
})