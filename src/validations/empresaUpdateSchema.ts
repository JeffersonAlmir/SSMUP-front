import * as yup from 'yup';
import { empresaSchema } from './empresaSchema';
import { enderecoSchema } from './enderecoSchema';
import { responsavelSchema } from './responsavelSchema';

export const empresaUpdateSchema = yup.object({
    ...empresaSchema.fields,
    endereco: enderecoSchema,
    responsavel: responsavelSchema,
})