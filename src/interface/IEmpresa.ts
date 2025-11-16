import * as yup from 'yup';
import type { empresaSchema } from '../validations/empresaSchema';

export default interface IEmpresa extends yup.InferType<typeof empresaSchema>{}