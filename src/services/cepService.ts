import axios from "axios";

/**
 * Busca informações de um CEP na API ViaCEP.
 * @param {string} cep O CEP (pode conter máscara)
 * @returns {Promise<object>} Os dados do endereço
 * @throws {Error} Se o CEP for inválido, não encontrado ou houver erro na rede.
 */
export const getCepInfo = async (cep:string) =>{

    const cleanCep = cep.replace(/\D/g,'');

    if(cleanCep.length !== 8){
        throw new Error('Formato de CEP inválido.')
    }
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
        
        if(!(response.status == 200)){
            throw new Error('Erro ao buscar o CEP. Tente novamente.')
        }

        const data = await response.data;
        return data;
        
    } catch (error) {
        if(error instanceof TypeError){
            throw new Error('Erro de conexão ao buscar o CEP.')
        }
        throw error;
    }
}