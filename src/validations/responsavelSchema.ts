import * as yup from 'yup';

export const responsavelSchema = yup.object({
    nome: yup.string()
        .trim()
        .min(10)
        .max(50)
        .required(),
    cpf: yup.string()
        // .test(
        //     'test-invalid-cpf',
        //     'cpf inválido',
        //     (cpf) =>//  validateCpf(cpf))
            .required(),
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