import * as yup from 'yup';
import type { enderecoSchema } from "../validations/enderecoSchema";

export default interface IEndereco extends yup.InferType<typeof enderecoSchema> { };