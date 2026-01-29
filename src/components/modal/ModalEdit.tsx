import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconXboxX } from '@tabler/icons-react';
import FormEditEmpresa from '../form/FormEditEmpresa';

export type ModalEditProps = {
  botaoDisable: boolean
}

export default function ModalEdit({botaoDisable}: ModalEditProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal 
        size={"55rem"}
        opened={opened} 
        onClose={close} 
        title={
          <Text fw={700} size="xl" mb="md" className="mantine-Modal-title"> 
            Cadastro de Empresa
          </Text>
        }
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        <FormEditEmpresa close={close}/>
      </Modal>
      
      <Button 
        leftSection={<IconPencil size={18} />} 
        onClick={open}
        disabled={botaoDisable}
      >
        Editar
      </Button>
    </>
  );
}