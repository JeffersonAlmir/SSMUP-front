export const checkValidCpf = (cpf: string):boolean =>{
    const cleanCpf = cpf.replace(/\D/g,'')
    if(cleanCpf.length !== 11){
        return false;
    }
    if(cleanCpf.split("").every((numero) => numero === cleanCpf[0])){
        return false;
    }

    function calcularDigito(cpfClean:string, fatorInical:number):number  {
        let soma = 0;

        for(let i = 0; i < fatorInical - 1; i++){
            soma += Number(cpfClean.charAt(i))*(fatorInical -i)
        }
        const resto = (soma*10)%11;

        if(resto === 10 || resto == 11){
            return 0;
        }
        return resto;
    }

    const digito1 = calcularDigito(cleanCpf,10);
    const digito2 = calcularDigito(cleanCpf,11);

    return digito1 === Number(cleanCpf[9]) && digito2 === Number(cleanCpf[10]);


}