
const PedidoUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['RzSocial'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstPedido) => {

        const data = {
            filas: lstPedido,
            edita: true,
            elimina: true,
            iniCodigo: 'PED'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }


    return {
        generarTabla,
        getFiltros,
    }
}