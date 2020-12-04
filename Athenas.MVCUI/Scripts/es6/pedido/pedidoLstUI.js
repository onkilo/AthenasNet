
const PedidoUI = () => {
    //Para el listado
    const getFiltros = () => {
        const arrFiltros = ['Proveedor'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstPedidos) => {

        const data = {
            filas: lstPedidos,
            elimina: true,
            recibe: true,
            iniCodigo: 'PED',
            urlRecibir: AthenasNet.MVC_URL_BASE + 'Pedido/Recibir'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    //Para recibir el pedido

    const getBtnPostRecibir = () => document.getElementById('btn-pedido-recibir');


    //Para el registro


    return {
        generarTabla,
        getFiltros,
        getBtnPostRecibir
    }
}