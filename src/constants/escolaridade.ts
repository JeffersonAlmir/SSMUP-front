export const Escolaridade = {
  FUNDAMENTAL_INCOMPLETO: "Fundamental incompleto",
  FUNDAMENTAL_COMPLETO: "Fundamental completo",
  MEDIO_INCOMPLETO: "Médio incompleto",
  MEDIO_COMPLETO: "Médio completo",
  SUPERIOR_INCOMPLETO: "Superior incompleto",
  SUPERIOR_COMPLETO: "Superior completo",
} as const;

export type Escolaridade = typeof Escolaridade[keyof typeof Escolaridade];


export const escolaridadeOptions = Object.values(Escolaridade).map((value,index) => ({
    value,
    label: value,
    key: index + 1
}))