import * as yup from 'yup';

export const enderecoSchema = yup.object({
    rua:yup.string()
        .trim()
        .min(10)
        .max(50)
        .required(),
    numero:yup.string()
        .trim()
        .min(5)
        .max(5)
        .required(),
    bairro:yup.string()
        .trim()
        .min(5)
        .max(5)
        .required(),
    cep:yup.string()
        .trim()
        .min(9)
        .max(9)
        .required(),
    municipio: yup.string()
        .required(),
    uf: yup.string()
        .required()
        .min(2)
        .max(2),
    telefone:yup.string()
        .trim()
        .min(14)
        .max(14)
        .required()
})

interface Endereco extends yup.InferType<typeof enderecoSchema>{};