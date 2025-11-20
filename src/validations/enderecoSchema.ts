import * as yup from 'yup';

export const enderecoSchema = yup.object({
    rua: yup.string()
        .trim()
        .min(10, 'A rua deve ter no mínimo 10 caracteres')
        .max(50, 'A rua deve ter no máximo 50 caracteres')
        .required('O campo rua é obrigatório'),

    numero: yup.string()
        .trim()
        .min(2, 'O número deve ter no mínimo 2 caracteres')
        .max(5, 'O número deve ter no máximo 5 caracteres')
        .required('O campo número é obrigatório'),

    bairro: yup.string()
        .trim()
        .min(5, 'O bairro deve ter no mínimo 5 caracteres')
        .max(50, 'O bairro deve ter no máximo 50 caracteres')
        .required('O campo bairro é obrigatório'),

    cep: yup.string()
        .trim()
        .required('O campo CEP é obrigatório'),

    municipio: yup.string()
        .required('O município é obrigatório'),

    uf: yup.string()
        .length(2, 'A UF deve ter 2 caracteres (ex: PB)') 
        .required('A UF é obrigatória'),

    telefone: yup.string()
        .trim()
        .required('O telefone é obrigatório')
});

interface Endereco extends yup.InferType<typeof enderecoSchema> { };