export const tipoRisco = {
    RISCO_I_BAIXO: "Risco baixo", 
    RISCO_II_MEDIO: "Risco médio", 
    RISCO_III_ALTO: "Risco alto" 
}

export type tipoRiscoKey = keyof typeof tipoRisco;

export function getTipoRisco (key: tipoRiscoKey):string {
    return tipoRisco[key];
}

export const tipoRiscoOptions = Object.entries(tipoRisco).map(([key, value]) => ({
    value: key,
    label: value,
}));

export const getRiscoColor = (riscoValue: string | undefined) => {
    switch (riscoValue) {
      case 'RISCO_III_ALTO': return 'red';
      case 'RISCO_II_MEDIO': return 'orange';
      case 'RISCO_I_BAIXO': return 'blue';
      default: return 'gray';
    }
  };