import { Divider, Grid, InputBase, Loader, Stack, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { useState, type FocusEvent } from "react";
import { IMaskInput } from "react-imask";
import { getCepInfo } from "../../services/cepService";
import type IEndereco from "../../interface/IEndereco";

export type FormEnderecoProps = {
  form: UseFormReturnType<IEndereco>;
}

export default function FormEndereco({ form }: FormEnderecoProps) {
  const [isCepLoading, setIsCepLoading] = useState(false);

  const handleCepBlur = async (event: FocusEvent<HTMLInputElement>) => {
    form.getInputProps('cep').onBlur(event);
    const cep = event.currentTarget.value.replace(/\D/g, '');

    if (cep.length !== 8) {
      return;
    }

    setIsCepLoading(true);

    try {
      const data = await getCepInfo(cep);
      form.setFieldValue('municipio', data.localidade);
      form.setFieldValue('uf', data.uf);

      form.clearFieldError('cep');
    } catch (error) {
      if (error instanceof Error) {
        form.setFieldError('cep', error.message);
      } else {
        form.setFieldError('cep', 'Erro inesperado ao buscar CEP.');
      }
    } finally {
      setIsCepLoading(false);
    }
  };

  return (
    <Stack gap="md">
      <Divider label="Endereço" labelPosition="center" fw={700} size={'sm'} />
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <TextInput
            label="Rua"
            placeholder="Av. Principal"
            required
            {...form.getInputProps('rua')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="Número"
            placeholder="123"
            type='number'
            maxLength={5}
            required
            {...form.getInputProps('numero')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Bairro"
            placeholder="Centro"
            required
            {...form.getInputProps('bairro')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <InputBase
            label="CEP"
            placeholder="00000-000"
            required
            component={IMaskInput}
            mask="00000-000"
            {...form.getInputProps('cep')}
            rightSection={isCepLoading ? <Loader size="xs" /> : null}
            onBlur={handleCepBlur}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Município"
            placeholder="Sua cidade"
            disabled={isCepLoading}
            required
            {...form.getInputProps('municipio')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <TextInput
            label="Estado (UF)"
            placeholder="PB"
            disabled={isCepLoading}
            maxLength={2}
            required
            {...form.getInputProps('uf')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <InputBase
            label="Telefone"
            required
            placeholder="(00) 00000-0000"
            component={IMaskInput}
            mask="(00) 00000-0000"
            {...form.getInputProps('telefone')}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}