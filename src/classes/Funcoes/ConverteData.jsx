export default function ConverteData(data) {
    let dataAtual = new Date(data);
    let dia = '' + dataAtual.getDate();
    let mes = '' + (dataAtual.getMonth() + 1);
    let ano = '' + dataAtual.getFullYear();

    if (dia.length < 2) {
        dia = '0' + dia;
    }

    if (mes.length < 2) {
        mes = '0' + mes;
    }

    let formatada = [dia, mes, ano].join('/');
    return formatada;
}