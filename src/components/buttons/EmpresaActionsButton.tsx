import { Button } from "@mantine/core";
import type IResponseItens from "../../interface/IResponseItens";
import { IconBan, IconFileCertificate } from "@tabler/icons-react";
import ModalEdit from "../modal/ModalEdit";
import ModalInspecao from "../modal/ModalInspecao";

export type ActionButtonProps={
    dataEmpresa:IResponseItens
    loading:boolean;
    isDisabled:boolean;
    handleSubmit: ()=> void;
    handleInativar: ()=> void;
    handleAtivar: ()=> void
}
export default function EmpresaActionButton ({
    dataEmpresa,
    loading,
    isDisabled,
    handleSubmit,
    handleInativar,
    handleAtivar,
}: ActionButtonProps){

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
                <>
                    <Button 
                        disabled={isDisabled}
                        loading={loading}
                        variant="filled" 
                        color="green" 
                        onClick={handleSubmit}
                        leftSection={<IconFileCertificate size={18} />}
                    >
                        Gerar licença
                    </Button>

                    <ModalEdit
                        botaoDisable={loading}
                    />
                    
                    <Button 
                        disabled={loading}
                        variant="filled" 
                        color="red" 
                        onClick={handleInativar}
                        leftSection={<IconBan size={18} />}
                    >
                        Inativar cadastro
                    </Button>
                </>
            );
        }
        if(dataEmpresa.cnae.risco ==="RISCO_II_MEDIO" || dataEmpresa.cnae.risco ==="RISCO_III_ALTO"){
            if(!dataEmpresa.inspecao){
                return(
                    <>  <ModalInspecao
                            botaoDisable={loading}
                        /> 
                        <Button 
                            disabled={isDisabled}
                            loading={loading}
                            variant="filled" 
                            color="green" 
                            onClick={handleSubmit}
                            leftSection={<IconFileCertificate size={18} />}
                        >
                            Gerar licença
                        </Button>

                        <ModalEdit
                            botaoDisable={loading}
                        />
                        
                        <Button 
                            disabled={loading}
                            variant="filled" 
                            color="red" 
                            onClick={handleInativar}
                            leftSection={<IconBan size={18} />}
                        >
                            Inativar cadastro
                        </Button>
                    </>
                );
            }
            return(
                <>
                    <Button 
                        disabled={isDisabled}
                        loading={loading}
                        variant="filled" 
                        color="green" 
                        onClick={handleSubmit}
                        leftSection={<IconFileCertificate size={18} />}
                    >
                        Gerar licença
                    </Button>

                    <ModalEdit
                        botaoDisable={loading}
                    />
                    
                    <Button 
                        disabled={loading}
                        variant="filled" 
                        color="red" 
                        onClick={handleInativar}
                        leftSection={<IconBan size={18} />}
                    >
                        Inativar cadastro
                    </Button>
                </>
            );
        }
    }


}