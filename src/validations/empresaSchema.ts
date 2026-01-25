import * as yup from 'yup';
import { checkValidCnpj } from '../services/checkValidCnpj';


export const empresaSchema = yup.object({
    razaoSocial: yup.string()
        .trim()
        .min(5, 'A razão social deve ter no mínimo 5 caracteres')
        .max(50, 'A razão social deve ter no máximo 50 caracteres')
        .required('O campo razão social é obrigatório'),

    nomeFantasia: yup.string()
        .trim()
        .min(9, 'O nome fantasia deve ter no mínimo 9 caracteres')
        .max(50, 'O nome fantasia deve ter no máximo 50 caracteres')
        .required('O campo nome fantasia é obrigatório'),

    cnpj: yup.string()
        .trim()
        .required("O campo CNPJ é obrigatório")
        .test(
            'cnpj-check',
            'CNPJ inválido',
            (value: string) => {
                if (!value) return true;
                return checkValidCnpj(value);
            }
        ),

    inscricaoEstadual: yup.string()
        .trim()
        .required('O campo inscrição estadual é obrigatório'),

    atividadeFirma: yup.string()
        .trim()
        .min(5, 'A atividade deve ter no mínimo 5 caracteres')
        .max(50, 'A atividade deve ter no máximo 50 caracteres')
        .required('O campo atividade da firma é obrigatório'),

    subAtividade: yup.string()
        .trim()
        .min(5, 'A sub-atividade deve ter no mínimo 5 caracteres')
        .max(50, 'A sub-atividade deve ter no máximo 50 caracteres')
        .required('O campo sub-atividade é obrigatório'),

    dataInicioFuncionamento: yup.date()
        .typeError('Por favor, insira uma data válida')
        .required('A data de início é obrigatória'),

    email: yup.string()
            .trim()
            .email('Digite um email válido') 
            .min(5, 'O email deve ter no mínimo 5 caracteres')
            .max(50, 'O email deve ter no máximo 50 caracteres')
            .required('O campo email é obrigatório'),
    cnaeCodigo: yup.string()
            .trim()
            .required('O campo Cnae é obrigatório'),

})