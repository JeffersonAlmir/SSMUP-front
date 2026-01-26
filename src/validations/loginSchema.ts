import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string()
            .trim()
            .email('Digite um email válido') 
            .required('O campo email é obrigatório'),
    password: yup.string()
            .trim()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .max(100, 'A senha deve ter no máximo 100 caracteres')
            .required('A senha é obrigatória'),
})