import { 
  Badge, 
  Card, 
  Divider, 
  Group, 
  Pagination, 
  Table, 
  VisuallyHidden, 
  Select, 
  Text 
} from '@mantine/core';
import classes from './Table.module.css';
import { useEffect, useState, useCallback } from 'react';
import type IResponseEmpresa from '../../interface/IResponseEmpresa';
import type IResponseItens from '../../interface/IResponseItens';
import apiBackend from '../../services/apiBackend';
import ModalInspecao from '../modal/ModalInspecao';
import { getRiscoColor, getTipoRisco, tipoRiscoOptions, type tipoRiscoKey } from '../../constants/tipoRisco';
import { SearchableSelectInspecao } from '../searchebleSelect/SerachableSelectInspecao';

export default function InspecaoTable() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<IResponseItens[]>([]);
  const [risco, setRisco] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getEmpresasInspecoes = useCallback(async (pageNumber: number, riscoFilter: string | null) => {
    setLoading(true);
    try {
    
      let url = `/empresas/pagination/filter?inspecao=false&page=${pageNumber}&size=6&ativo=true`;
      
      if (riscoFilter) {
        url += `&risco=${riscoFilter}`;
      }

      const response = await apiBackend.get<IResponseEmpresa>(url);
      
      if (response.status === 200) {
        const empresasData = response.data;
        setData(empresasData.content);
        setTotalPages(empresasData.totalPages);
      }
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    getEmpresasInspecoes(page, risco);
  }, [page, risco, getEmpresasInspecoes]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };

  const handleRiscoChange = (value: string | null) => {
    setRisco(value);
    setPage(0); 
  };

  const handleClearSearch = useCallback(() => {
  
    if (page === 0) {
      getEmpresasInspecoes(0, risco);
    } else {
      setPage(0);
    }
  }, [page, risco, getEmpresasInspecoes]);


  const rows = data.map((item) => (
    <Table.Tr key={item.cnpj}>
      <Table.Td>
        <Text size="sm" fw={500}>{item.razaoSocial}</Text>
      </Table.Td>
      <Table.Td>{item.nomeFantasia}</Table.Td>
      <Table.Td>{item.cnpj}</Table.Td>
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
          <Badge color="green" variant="light">Sim</Badge>
        ) : (
          <Badge color="red" variant="light">Não</Badge>
        )}
      </Table.Td>
      <Table.Td>
        <ModalInspecao empresaId={item.id ?? 0}  onSuccess={() => getEmpresasInspecoes(page, risco)}/>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Group className={classes.group} mb="xl" justify="space-between">
        <Group>
          <SearchableSelectInspecao 
            dataEmpresa={setData}
            handleClear={handleClearSearch}
          />
          
          <Select
            placeholder="Grau de Risco"
            clearable
            data={tipoRiscoOptions}
            value={risco}
            onChange={handleRiscoChange}
            style={{ width: 200 }}
          />
        </Group>
      </Group>

      <Table highlightOnHover withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr className={classes.tableHeader}>
            <Table.Th>Razão Social</Table.Th>
            <Table.Th>Nome Fantasia</Table.Th>
            <Table.Th>CNPJ</Table.Th>
            <Table.Th>Risco</Table.Th>
            <Table.Th>Ativo</Table.Th>
            <Table.Th><VisuallyHidden>Ações</VisuallyHidden></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
             <Table.Tr>
                <Table.Td colSpan={6} style={{ textAlign: 'center' }}>Carregando...</Table.Td>
             </Table.Tr>
          ) : rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                Nenhuma empresa encontrada para os filtros selecionados.
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Divider my="md" />
      
      <Group >
        <Pagination 
          total={totalPages} 
          value={page + 1}
          onChange={handlePageChange}
          withEdges          
          withControls 
          mt="md"     
        />
      </Group>
    </Card>
  );
}