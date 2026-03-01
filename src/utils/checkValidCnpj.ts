export const checkValidCnpj = (cnpj: string): boolean =>{
    const clearCnpj = cnpj.replace(/\D/g,'');
    const peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    if(clearCnpj.length !== 14 ){
        return false;
    }
    
    if(clearCnpj.split("").every((numero) => numero === clearCnpj[0])){
        return false;
    }

    function calcularDigito(cnpjClear: string, fatorInical: number, arrayPeso:Array<number>): number  {
        let resultado = cnpjClear.slice(0, fatorInical).split("")
            .reduce((acumulador,valorAtual, indice) => {
                return acumulador + Number(valorAtual) * arrayPeso[indice + (fatorInical === 12 ? 1 : 0)]
            },0)
        
        let resto = resultado % 11

        if (resto < 2){
            return 0;
        }
        return 11 - resto;
    }

    const digito1 = calcularDigito(clearCnpj,12, peso);
    const digito2 = calcularDigito(clearCnpj,13,peso);

    return digito1 === Number(clearCnpj[12]) && digito2 === Number(clearCnpj[13])   
}