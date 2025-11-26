import { Card, Divider, Group, Pagination, Table, TextInput } from '@mantine/core';
import classes from './Table.module.css';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
// import ModalCadastro from '../modal/ModalCadastro';
import axios from 'axios';
// import type IEmpresa from '../../interface/IEmpresa';
import type IResponseEmpresa from '../../interface/IResponseEmpresa';
import type IResponseItens from '../../interface/IResponseItens';



export default function EmpresasTable() {
  const [focused, setFocused] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<IResponseItens[]>([]);

  const getEmpresas = async (pageNumber: number) => {
    try {
      const response = await axios.get<IResponseEmpresa>(
        `http://localhost:8080/v1/api/empresas/pagination?page=${pageNumber}`
      );
      
      if (response.status === 200) {
        const empresasData = response.data;
        setData(empresasData.content);
        setTotalPages(empresasData.totalPages);
      }
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    }
  };
    
  const rows = data.map((item) => (
    <Table.Tr key={item.cpfCnpj}>
      <Table.Td>{item.razaoSocial}</Table.Td>
      <Table.Td>{item.nomeFantasia}</Table.Td>
      <Table.Td>{item.cpfCnpj}</Table.Td>
      <Table.Td>{item?.endereco?.municipio} - {item.endereco.uf}</Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    getEmpresas(page);
  },[page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1); 
  }

  // const handleSaveSuccess = ()=>{
  //   console.log("Atualizando tabela após o cadastro...");
  //   getEmpresas(page);
  // }

  return (
    <Card withBorder
      radius="md" 
      p="xl" 
      className={classes.card}
    >
        <Group className={classes.group}>
            {/* <ModalCadastro onSaveSuccess={handleSaveSuccess }/> */}
            <TextInput
                placeholder="Pesquise a empresa pelo nome"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{ width: "500px" }}
                // value={}
                // onChange={}
            />
        </Group>
        <Table highlightOnHover withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr className={classes.tableHeader}>
            <Table.Th>Razão Social</Table.Th>
            <Table.Th>Nome Fantasia</Table.Th>
            <Table.Th>CNPJ</Table.Th>
            <Table.Th>Cidade/UF</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? rows : (
            <Table.Tr>
              <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                Nenhuma empresa encontrada
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      
        <Divider my="md" />
        <Pagination 
          total={totalPages} 
          value={page + 1}
          onChange={handlePageChange}
          withEdges          
          withControls 
          mt="md"     
        />
    </Card>
  );
}