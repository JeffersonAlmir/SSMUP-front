import { Button, Card, Group, px, Table, TextInput } from '@mantine/core';
import classes from './Table.module.css';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import ModalCadastro from '../modal/ModalCadastro';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

 export default function EmpresasTable() {
    const [focused, setFocused] = useState(false);

    
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
        <Group className={classes.group}>
            <ModalCadastro/>
            <TextInput
                placeholder="Search by any field"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{ width: "500px" }}
                // value={}
                // onChange={}
            />
        </Group>
        <Table   highlightOnHover withRowBorders={false} verticalSpacing="md"  >   
            <Table.Thead >
                <Table.Tr className={classes.tableHeader}>
                <Table.Th>Element position</Table.Th>
                <Table.Th>Element name</Table.Th>
                <Table.Th>Symbol</Table.Th>
                <Table.Th>Atomic mass</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            <Table.Caption>Scroll page to see sticky thead</Table.Caption>
        </Table>
    </Card>
  );
}