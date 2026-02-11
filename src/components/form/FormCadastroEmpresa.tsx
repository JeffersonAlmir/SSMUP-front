import { Button, Divider, Group, Paper, Stack, Stepper} from "@mantine/core";
import { yupResolver } from "mantine-form-yup-resolver";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import SubmitOverlay from "../loader/SubmitOverlay";
import dayjs from "dayjs";


import { responsavelSchema } from "../../validations/responsavelSchema";
import { enderecoSchema } from "../../validations/enderecoSchema";
import { empresaSchema } from "../../validations/empresaSchema";

import FormEndereco from "./FormEndereco";
import FormEmpresa from "./FormEmpresa";
import FormResponsavel from "./FormulaResponsavel";

import type IEndereco from "../../interface/IEndereco";
import type IResponsavel from "../../interface/IResponsavel";
import type IEmpresa from "../../interface/IEmpresa";
import apiBackend from "../../services/apiBackend";
import type ICreateEmpresa from "../../interface/ICreateEmpresa";
import DetailsCreateEmpresa from "../details/DetailsCreateEmpresa";
import { IconCheck, IconX } from "@tabler/icons-react";


export default function FormEmpresaWizard() {
  const [active, setActive] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const formEmpresa = useForm<IEmpresa>({
    initialValues: {
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      inscricaoEstadual: '',
      atividadeFirma: '',
      subAtividade: '',
      dataInicioFuncionamento:undefined as unknown as Date,
      email:'',
      cnaeCodigo:''
    },
    validate: yupResolver(empresaSchema),
  });

  const formEndereco = useForm<IEndereco>({
    initialValues: {
      rua: '',
      numero: '',
      bairro: '',
      cep: '',
      municipio: '',
      uf: '',
      telefone: '',
    },
    validate: yupResolver(enderecoSchema),
  });

  const formResponsavel = useForm<IResponsavel>({ 
    initialValues: {
      nome: '',
      cpf: '',
      rg: '',
      escolaridade: '',
      formacao: '',
      especialidade: '',
      registroConselho: '',
    },
    validate: yupResolver(responsavelSchema),
  });


  const handleNextStep = () => {
   
    if (active === 0) {
      const validation = formEmpresa.validate();
      if (validation.hasErrors) return; 
      setActive(1);
    }
    else if (active === 1) {
      const validation = formEndereco.validate();
      if (validation.hasErrors) return;
      setActive(2);
    }
    else if (active === 2) {
      const validation = formResponsavel.validate();
      if (validation.hasErrors) return;
      setActive(3); 
    }
  };
  
  const handlePrevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    
    const dateFormated = dayjs(formEmpresa.getValues().dataInicioFuncionamento).format('DD/MM/YYYY');
    const dataEmpresa={
      ...formEmpresa.getValues(),
      dataInicioFuncionamento:dateFormated
    };

    const newEmpresa : ICreateEmpresa = {
        ...dataEmpresa,
        responsavel: formResponsavel.getValues(),
        endereco: formEndereco.getValues(),
    };

    setLoading(true);

    try {
      const response = await apiBackend.post('/empresas',newEmpresa)
      
      if(response.status == 201){
        formEmpresa.reset();
        formEndereco.reset();
        formResponsavel.reset();
        setActive(0);
        
        notifications.show({
          title: 'Sucesso!',
          message: 'A empresa foi cadastrada corretamente.',
          color: 'green',
          icon: <IconCheck size={18} />
        });
      }
      
      console.log("Sucesso:",newEmpresa);

    } catch (error) {
    
      console.error("Erro ao enviar:", error);
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível realizar o cadastro. Tente novamente.',
        color: 'red',
        icon: <IconX size={18} />
      });
    } finally {
      setLoading(false);
    }
  };

  // const dataEmpresa = () => {

  //   const dateFormated = dayjs(formEmpresa.getValues().dataInicioFuncionamento).format('DD/MM/YYYY');
  //   const dataEmpresa={
  //     ...formEmpresa.getValues(),
  //     dataInicioFuncionamento:dateFormated
  //   };
  //   const newEmpresa : IResponseItens = {
  //        ...dataEmpresa,
  //        responsavel: formResponsavel.getValues(),
  //        endereco: formEndereco.getValues(),
  //   };
    
  //   return newEmpresa
  // }
  
  return (
    <>

      <Paper shadow="md" p="xl" radius="md" withBorder  mx="auto" mt="xl">
        {loading && (
        <SubmitOverlay/>
        )}
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
          <Stepper.Step label="Empresa" description="Informações da empresa">
            <FormEmpresa form={formEmpresa} />
          </Stepper.Step>

          <Stepper.Step label="Endereço" description="Endereço da empresa">
            <FormEndereco form={formEndereco} />
          </Stepper.Step>

          <Stepper.Step label="Responsável" description="Responsável pela empresa">
            <FormResponsavel form={formResponsavel} />
          </Stepper.Step>

          <Stepper.Completed>
            <Stack align="stretch" gap="lg">
              <Divider label="Confirmação dos Dados" labelPosition="center" />

              <DetailsCreateEmpresa
                dataEmpresa={formEmpresa.getValues()}
                dataEndereco={formEndereco.getValues()}
                dataResponsavel={formResponsavel.getValues()}
              />

              {/* BOTÕES */}
              <Group mt="md" justify="flex-end">
                <Button variant="default" onClick={() => setActive(2)} disabled={loading}>Voltar</Button>
                <Button color="green"  onClick={handleSubmit} loading={loading}>Confirmar e Salvar</Button>
              </Group>
            </Stack>
          </Stepper.Completed>
        </Stepper>
        {active < 3 && (
          <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={handlePrevStep} disabled={active === 0}>
                  Voltar
              </Button>
              <Button onClick={handleNextStep}>
                  Próximo
              </Button>
          </Group>
        )}
      </Paper>
    </>
  );
}