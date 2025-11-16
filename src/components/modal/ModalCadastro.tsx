import { Button, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconXboxX } from '@tabler/icons-react';
import FormCadastro from '../form/FormCadastroEmpresa';


export default function ModalCadastro() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal 
        size={"55rem"}
        opened={opened} 
        onClose={close} 
        title={
          <Title order={2} mb="md">
              Cadastro de Empresa
          </Title>
        }
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        <FormCadastro/>
      </Modal>

      <Button variant="filled" onClick={open}>
        Cadastra Empresa
      </Button>
    </>
  );
}