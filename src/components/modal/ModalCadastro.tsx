import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


 export default function ModalCadastro() {
   const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal 
        size={"55rem"}
        opened={opened} 
        onClose={close} 
        title="Authentication"
      >
        {/* Modal content */}
      </Modal>

      <Button variant="filled" onClick={open}>
        Cadastra Empresa
      </Button>
    </>
  );
}