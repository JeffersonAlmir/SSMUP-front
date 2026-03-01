import apiBackend from "../../config/apiBackend"

export  const getEmpresasStatusData = async () =>{
    const[empresaAtivas,empresaInativas] = await Promise.all([
        apiBackend.get('/empresas/ativas'),
        apiBackend.get('/empresas/inativas'),
        
    ]);
    return [
        { name: 'Ativo', value: empresaAtivas.data.length, color: 'teal' },
        { name: 'Inativo', value: empresaInativas.data.length, color: 'red' },
    ];


    
}