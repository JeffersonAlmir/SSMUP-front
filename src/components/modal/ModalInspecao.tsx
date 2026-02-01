import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheckupList, IconXboxX } from '@tabler/icons-react';
import FormInspecao from '../form/FormInspecao';

export type ModalInspecaoProps = {
  botaoDisable: boolean
}


export default function ModalInspecao({botaoDisable}: ModalInspecaoProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal 
        size={"55rem"}
        opened={opened} 
        onClose={close} 
        title={
          <Text fw={700} size="xl" mb="md" className="mantine-Modal-title"> 
            Inspeção
          </Text>
        }
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        <FormInspecao close={close}/>
      </Modal>
      
      <Button 
        leftSection={<IconCheckupList size={18} />} 
        onClick={open}
        disabled={botaoDisable}
        color="yellow"
      >
        Realizar Inspeção
      </Button>
    </>
  );
}
