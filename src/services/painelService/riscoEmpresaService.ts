import apiBackend from "../apiBackend"

export const getEmpresasRiscoData = async () =>{
    
    const quantidadeEmpresaRisco =  await apiBackend.get('/empresas/risco');
    return[
        {name: 'Risco Baixo', value: quantidadeEmpresaRisco.data.qtEmpresasBaixoRisco, color: 'indigo.6'},
        {name: 'Risco Médio', value: quantidadeEmpresaRisco.data.qtEmpresasRiscoMedio, color: 'yellow.6'},
        {name: 'Risco Alto', value: quantidadeEmpresaRisco.data.qtEmpresasRiscoAlto, color: 'teal.6'},
    ];
}