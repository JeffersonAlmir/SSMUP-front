import apiBackend from "./apiBackend"

 export const getCodigoCnaes = async() =>{
    try {
      const response = await apiBackend.get("/cnaes")

      if (response.status === 200){
        return response.data
      }
      return []
    } catch (error) {
      console.error('Erro ao buscar código Cnae:', error)
      throw error;
     
    }
} 