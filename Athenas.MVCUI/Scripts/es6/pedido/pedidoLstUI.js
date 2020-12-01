
const PedidoUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Proveedor'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstPedido) => {
        console.log(lstPedido)
        const data = {
            filas: lstPedido,
            edita: false,
            recibe: true,
            elimina: true,
            iniCodigo: 'PED',
            recibirUrl: `${window.location.host}${window.location.pathname}/Recibir`
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }


    return {
        generarTabla,
        getFiltros,
    }
}