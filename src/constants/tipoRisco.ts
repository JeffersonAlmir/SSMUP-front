export const tipoRisco = {
    RISCO_I_BAIXO: "Risco baixo", 
    RISCO_II_MEDIO: "Risco médio", 
    RISCO_III_ALTO: "Risco alto" 
}

export type tipoRiscoKey = keyof typeof tipoRisco;

export function getTipoRisco (key: tipoRiscoKey):string {
    return tipoRisco[key];
}