import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";

import ModalInativarEmpresa from "../modal/ModalInativarEmpresa";
import { IconBan } from "@tabler/icons-react";
import { useUpdateEmpresaContext } from "../../hooks/useUpdateEmpresaContext";

export type InativarEmpresaProps={
    loading:boolean;
}

export default function InativarEmpresaButton({loading}:InativarEmpresaProps) {
    const { handleInativar } = useUpdateEmpresaContext();
  return (
    <Button
      color="red"
      variant="filled" 
      leftSection={<IconBan size={18} />}
      disabled={loading}
      onClick={() => {
        modals.open({
          title: 'Inativação de Empresa',
          centered: true,
          children: <ModalInativarEmpresa handleInativar={handleInativar}/>, 
        });
      }}
    >
      Inativar Empresa
    </Button>
  );
}