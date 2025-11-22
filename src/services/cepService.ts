import axios from "axios";

/**
 * Busca informações de um CEP na API ViaCEP.
 * @param {string} cep O CEP (pode conter máscara)
 * @returns {Promise<object>} Os dados do endereço
 * @throws {Error} Se o CEP for inválido, não encontrado ou houver erro na rede.
 */
export const getCepInfo = async (cep: string) => {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    throw new Error('Formato de CEP inválido.');
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (response.status !== 200) {
      throw new Error('Erro ao buscar o CEP. Tente novamente.');
    }

    const data = response.data;

    if (data.erro) {
      throw new Error('CEP não encontrado. Verifique o número.');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro inesperado ao buscar CEP.');
  }
};
