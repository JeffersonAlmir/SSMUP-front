import { Button } from "@mantine/core";
import { IconFileCertificate } from "@tabler/icons-react";
import ModalEdit from "../modal/ModalEdit";
import ModalInspecao from "../modal/ModalInspecao";
import InativarEmpresaButton from "./InativarEmpresaButtom";
import { useUpdateEmpresaContext } from "../../hooks/useUpdateEmpresaContext";


export default function EmpresaActionButton (){
    const {dataEmpresa,handleDownloadPDF, loading, isDisabled, handleAtivar} = useUpdateEmpresaContext()

    const ActionGroup = (
         <>
            <Button 
                disabled={isDisabled}
                loading={loading}
                variant="filled" 
                color="green" 
                onClick={handleDownloadPDF}
                leftSection={<IconFileCertificate size={18} />}
            >
                Gerar licença
            </Button>

            <ModalEdit
                botaoDisable={loading}
            />
            
            <InativarEmpresaButton loading={loading}/>
        </>
    );

    if(!dataEmpresa.ativo){
        return(
            <Button 
                loading={loading}
                variant="filled" 
                color="blue" 
                onClick={handleAtivar}
            >
                Ativar Cadastro
            </Button>
        );
    }else{
        if(dataEmpresa.cnae.risco ==="RISCO_I_BAIXO"){
            return(
                ActionGroup
            );
        }
        if(dataEmpresa.cnae.risco ==="RISCO_II_MEDIO" || dataEmpresa.cnae.risco ==="RISCO_III_ALTO"){
            if(!dataEmpresa.inspecao){
                return(
                    <>  
                        <ModalInspecao botaoDisable={loading}/> 
                        {ActionGroup}
                    </>
                );
            }
            return(
               ActionGroup
            );
        }
    }


}