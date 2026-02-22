import { useEffect, useState } from 'react';
import { Combobox, useCombobox, Loader, Group, Text, InputBase, Stack } from '@mantine/core';
import { IconBuildingStore, IconSearch } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import apiBackend from '../../services/apiBackend';
import type IResponseEmpresa from '../../interface/IResponseEmpresa';
import type IResponseItens from '../../interface/IResponseItens';
import { useNavigate } from 'react-router-dom';


export function SearchableSelect() {
  const navigate = useNavigate();
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<IResponseItens[]>([]);
  

  useEffect(() =>{
    if(debounced.trim().length < 3){
      setOptions([]);
      return;
    }
    const fetchEmpresas = async ()=>{
      setLoading(true);
      combobox.openDropdown();
      try {
        const response = await apiBackend.get<IResponseEmpresa>(`empresas/buscaAproximada?termo=${debounced}&size=3`);
        if(response.status == 200){

          setOptions(response.data.content)
        }
      } catch (error) {
        console.error('Erro na busca:', error);
      } finally{
        setLoading(false)
      }
    };

    fetchEmpresas();
  },[debounced])

  const handleNavigate =(idSelecionado:string)=>{
    const empresaSelecionada = options.find((option) =>{
      return option.id!.toString() === idSelecionado
    })
    navigate(`/detalhes/${empresaSelecionada!.cnpj.replace(/\D/g,"")}`, 
      { state: { item :empresaSelecionada } })
  }

  return (
    <Combobox 
      store={combobox} 
      onOptionSubmit={(idSelecionado) => {
        handleNavigate(idSelecionado);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          placeholder="Digite nome fantasia, razão social"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}

          style={{ width: "500px" }}
          leftSection={<IconSearch size={16} stroke={1.5} />}
          radius="md"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {loading ? (
            <Combobox.Empty>
              <Group gap="sm" justify="center" p="xs">
                <Loader size="xs" />
                <Text size="sm">Buscando empresas...</Text>
              </Group>
            </Combobox.Empty>
          ) : options.length > 0 ? (
           options.map((item) => (
              <Combobox.Option value={item.id!.toString()} key={item.id}>
                <Group gap="sm" wrap="nowrap">
                  <IconBuildingStore size={20} color="gray" />
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>
                      {item.razaoSocial}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Nome Fantasia: {item.nomeFantasia}
                    </Text>
                    <Text size="xs" c="blue">
                      CNPJ: {item.cnpj}
                    </Text>
                  </Stack>
                </Group>
              </Combobox.Option>
            ))
          ) : (
            <Combobox.Empty>Nenhum resultado encontrado</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}