import { Badge, Button, Card, Divider, Group, Pagination, Table, VisuallyHidden} from '@mantine/core';
import classes from './Table.module.css';
import { useEffect, useState } from 'react';
import type IResponseEmpresa from '../../interface/IResponseEmpresa';
import type IResponseItens from '../../interface/IResponseItens';
import { useNavigate } from 'react-router-dom';
import apiBackend from '../../config/apiBackend';
import { SearchableSelect } from '../searchableSelect/SearchebleSelect';
import { getRiscoColor, getTipoRisco, type tipoRiscoKey } from '../../constants/tipoRisco';


export default function EmpresasTable() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<IResponseItens[]>([]);
  const navigate =  useNavigate();

  const getEmpresas = async (pageNumber: number) => {
    try {
      const response = await apiBackend.get<IResponseEmpresa>(`/empresas/pagination?page=${pageNumber}`);
      
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
    <Table.Tr key={item.cnpj}>
      <Table.Td>{item.razaoSocial}</Table.Td>
      <Table.Td>{item.nomeFantasia}</Table.Td>
      <Table.Td>{item.cnpj}</Table.Td>
      <Table.Td>{item.endereco.municipio} - {item.endereco.uf}</Table.Td>
      <Table.Td>
        <Badge color={getRiscoColor(item.cnae?.risco)} variant="dot">
          {item.cnae?.risco 
          ? getTipoRisco(item.cnae.risco as tipoRiscoKey).replace(/risco/i, '').trim()
          : 'N/A'
          }
        </Badge>
      </Table.Td>
      <Table.Td>
        {item.ativo ? (
          <Badge color="green" variant="light" radius="sm">
            Sim
          </Badge>
        ) : (
          <Badge color="red" variant="light" radius="sm">
            Não
          </Badge>
        )}
      </Table.Td>
        <Table.Td>
          <Button 
            variant="primary"
            onClick={() => navigate(`/detalhes/${item.cnpj.replace(/\D/g,"")}`, { state: { item } })}
          >
            Detalhes
          </Button>
        </Table.Td>
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

          <SearchableSelect/>
        </Group>
        <Table highlightOnHover withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr className={classes.tableHeader}>
            <Table.Th>Razão Social</Table.Th>
            <Table.Th>Nome Fantasia</Table.Th>
            <Table.Th>CNPJ</Table.Th>
            <Table.Th>Cidade/UF</Table.Th>
             <Table.Th>Risco</Table.Th>
            <Table.Th>Ativo</Table.Th>
             <Table.Th><VisuallyHidden>Ações</VisuallyHidden></Table.Th>
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