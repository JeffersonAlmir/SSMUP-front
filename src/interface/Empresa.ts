import * as yup from 'yup';
import type { empresaSchema } from '../validations/empresaSchema';

interface Empresa extends yup.InferType<typeof empresaSchema>{}