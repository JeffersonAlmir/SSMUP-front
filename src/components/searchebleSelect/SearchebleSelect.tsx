import { useState } from 'react';
import { Combobox, useCombobox, Loader, Group, Text, InputBase } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';

export function SearchableSelect() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  console.log(debounced);
  console.log(setLoading);
  console.log(setOptions);

  // useEffect(() =>{
  //   if(debounced.trim.length < 3){
  //     setOptions([]);
  //     return;
  //   }
  //   const fetchEmpresas = async ()=>{
  //     setLoading(true);
  //     combobox.openDropdown();
  //     try {
        
  //     } catch (error) {
  //       console.error('Erro na busca:', error);
  //     } finally{
  //       setLoading(false)
  //     }
  //   };

  //   fetchEmpresas();
  // },[debounced,combobox])


  return (
    <Combobox store={combobox} onOptionSubmit={(val) => {
      setValue(val);
      combobox.closeDropdown();
    }}>
      <Combobox.Target>
        <InputBase
          placeholder="Pesquise a empresa"
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
              <Combobox.Option value={item} key={item}>
                {item}
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