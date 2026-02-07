import * as yup from 'yup';
import type { funcionarioSchema } from '../validations/funcionarioSchema';
import type { Role } from '../constants/roles';

export default interface IUsuarioCreate extends yup.InferType<typeof funcionarioSchema>{
  role?:Role
}