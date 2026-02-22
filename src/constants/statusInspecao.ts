const StatusInspecao = {
    PENDENTE: "Pendente",
    APROVADA: "Aprovada",
    REPROVADA: "Reprovada",
} as const;

export const StatusInspecaoOption = Object.entries(StatusInspecao).map(
    ([key,value]) => ({
        value:key,
        label:value
    })
);