import * as yup from 'yup';

export const enderecoSchema = yup.object({
    rua:yup.string()
        .min(10)
        .max(50)
        .required(),
    numero:yup.string()
        .min(5)
        .max(5)
        .required(),
    bairro:yup.string()
        .min(5)
        .max(5)
        .required(),
    cep:yup.string()
        .min(8)
        .max(8)
        .required(),
    municipio: yup.string()
        .required(),
    uf: yup.string()
        .required(),
    telefone:yup.string()
        .min(11)
        .max(11)
        .required()
})

interface endereco extends yup.InferType<typeof enderecoSchema>{};