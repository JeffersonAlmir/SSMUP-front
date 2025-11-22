import * as yup from 'yup';
import type { responsavelSchema } from "../validations/responsavelSchema";

export default interface IResponsavel extends yup.InferType<typeof responsavelSchema> { };