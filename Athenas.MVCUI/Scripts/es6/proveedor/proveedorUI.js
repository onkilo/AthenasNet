const ProveedorUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['RzSocial'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstProveedores) => {

        const data = {
            filas: lstProveedores,//=> item
            edita: true,
            elimina: true,
            iniCodigo: 'PV'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getProveedor = () => {
        return AthenasNet.Mant.getEntidad([
            'RzSocial',
            'Id',
            'accion',
            'RUC',
            'Representante',
            'Email',
            'Telefono',
            'Direccion']);
    }

    return {
        getProveedor,
        generarTabla,
        getFiltros
    }
}