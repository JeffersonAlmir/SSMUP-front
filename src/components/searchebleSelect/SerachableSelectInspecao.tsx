import { useEffect, useState } from 'react';
import { Loader, InputBase, CloseButton } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import apiBackend from '../../services/apiBackend';
import type IResponseEmpresa from '../../interface/IResponseEmpresa';
import type IResponseItens from '../../interface/IResponseItens';



type SearchableProps ={
  dataEmpresa:(empresas:IResponseItens[] ) =>void;
  handleClear: () => void;
}
export function SearchableSelectInspecao({dataEmpresa,handleClear}:SearchableProps) { 
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);
  const [loading, setLoading] = useState(false);
  

  const fetchEmpresas = async ()=>{
    setLoading(true);
    try {
      const response = await apiBackend.get<IResponseEmpresa>(
        `empresas/buscaAproximada?termo=${debounced}&size=3`
      );

      if(response.status === 200){
      
        const empresasFiltradas = response.data.content.filter(
        (empresa) => empresa.ativo && !empresa.inspecao
        );
        dataEmpresa(empresasFiltradas);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() =>{
    if(debounced.trim().length === 0){
      return;
    }
    
    if(debounced.trim().length < 2){
    
      return;
    }
    fetchEmpresas();
  },[debounced])

  
  const handleClearInput = ()=>{
    setValue("");
    handleClear();
  }

  return (
    
    <InputBase
      placeholder="Digite nome fantasia, razão social"
      value={value}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      style={{ width: "500px" }}
      leftSection={<IconSearch size={16} stroke={1.5} />}
      rightSection={
        loading ? (
          <Loader size="xs" /> 
        ) : value !== '' ? (
          <CloseButton
            title='Limpar pesquisa'
            onClick={handleClearInput}
            onMouseDown={(event) => event.preventDefault()} 
          />
        ) : null
      }
      
    />
     
  );
}