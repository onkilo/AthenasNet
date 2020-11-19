const ClienteUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Nombre'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstClientes) => {

        const data = {
            filas: lstClientes,//=> item
            edita: true,
            elimina: true,
            iniCodigo: 'CL'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getCliente = () => {
        return AthenasNet.Mant.getEntidad([
            'Nombre',
            'Id',
            'accion',
            'Apellido',
            'Telefono',
            'Dni',
            'Sexo'
        ]);
    }

    return {
        getCliente,
        generarTabla,
        getFiltros
    }
}