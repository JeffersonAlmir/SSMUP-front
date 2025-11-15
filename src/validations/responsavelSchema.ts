import * as yup from 'yup';

export const responsavelSchema = yup.object({
    nome: yup.string()
        .trim()
        .min(10)
        .max(50)
        .required(),
    cpf: yup.string()
        .trim()
        .min(11)
        .max(11)
        .required(),
    rg: yup.string()
        .trim()
        .min(7)
        .max(7)
        .required(),
    email: yup.string()
        .trim()
        .min(5)
        .max(50)
        .required(),
    escolaridade: yup.string()
        .trim(),
    formacao:yup.string()
        .trim(),
    especialidade:yup.string()
        .trim(),
    registroConselho:yup.string()
        .trim(),
})

interface Responsavel extends yup.InferType<typeof responsavelSchema>{};