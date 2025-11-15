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
        .min(8)
        .max(8)
        .required(),
    municipio: yup.string()
        .required(),
    uf: yup.string()
        .required(),
    telefone:yup.string()
        .trim()
        .min(11)
        .max(11)
        .required()
})

interface Endereco extends yup.InferType<typeof enderecoSchema>{};