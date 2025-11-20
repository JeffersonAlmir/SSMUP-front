import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconXboxX } from '@tabler/icons-react';
import FormCadastro from '../form/FormCadastroEmpresa';

type ModalCadastroProps = {
  onSaveSuccess: () => void;
}

export default function ModalCadastro({onSaveSuccess}:ModalCadastroProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleFormSuccess = () => {
    close(); 
    onSaveSuccess(); 
  };

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
        <FormCadastro close={close} onSuccessSave={handleFormSuccess}/>
      </Modal>

      <Button variant="filled" onClick={open}>
        Cadastra Empresa
      </Button>
    </>
  );
}