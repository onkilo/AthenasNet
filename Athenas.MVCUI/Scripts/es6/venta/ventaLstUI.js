const VentaUI = () => {
    //Para el listado
    const getFiltros = () => {
        const arrFiltros = ['Cliente'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstVentas) => {

        const data = {
            filas: lstVentas,
            elimina: true,
            iniCodigo: 'VEN'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

 

    const getBtnAgregarDet = () => document.getElementById('btn-agregar-detalle');

    const getModalBuscar = () => $('#modalBuscar');

    const setModalBuscarData = (data) => {
        AthenasNet.compilaTemplate('tempModalBuscar', data, '#modalBuscar .modal-content')
    }

    const setDetalleData = (data) => {
        AthenasNet.compilaTemplate('tempDetalle', data, '#tb-detalle #det-body')
    }

    return {
        generarTabla,
        getFiltros,
        getModalBuscar,
        setModalBuscarData,
        setDetalleData,
        getBtnAgregarDet
    }
}