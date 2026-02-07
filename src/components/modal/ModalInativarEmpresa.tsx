import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";

export type ModalInativarProps={
    handleInativar: (justificativaFinal:string)=> void;
}
export default function ModalInativarEmpresa({handleInativar}:ModalInativarProps) {
  const [motivo, setMotivo] = useState<string>("");
  const [outroMotivo, setOutroMotivo] = useState("");

  const handleConfirm = () => {
    const justificativaFinal = motivo === "outro" ? outroMotivo : motivo;
    handleInativar(justificativaFinal)
    modals.closeAll();
  };

  return (
    <Stack gap="md">
      <Select
        label="Selecione o motivo"
        placeholder="Escolha uma opção"
        data={[
          { value: 'falta_documento', label: 'Falta de Documentação' },
          { value: 'irregularidade_sanitaria', label: 'Irregularidade Sanitária' },
          { value: 'encerramento', label: 'Encerramento de Atividades' },
          { value: 'outro', label: 'Outro motivo...' },
        ]}
        value={motivo}
        onChange={(val) => setMotivo(val || "")}
        allowDeselect={false}
      />

      {motivo === 'outro' && (
        <TextInput
          label="Especifique o motivo"
          placeholder="Digite aqui o motivo detalhado"
          value={outroMotivo}
          onChange={(event) => setOutroMotivo(event.currentTarget.value)}
          data-autofocus
        />
      )}

      <Group justify="flex-end" mt="xl">
        <Button variant="subtle" onClick={() => modals.closeAll()}>
          Cancelar
        </Button>
        <Button 
          color="red" 
          onClick={handleConfirm}
          disabled={!motivo || (motivo === 'outro' && !outroMotivo)}
        >
          Confirmar Inativação
        </Button>
      </Group>
    </Stack>
  );
}