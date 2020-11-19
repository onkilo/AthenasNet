const UsuarioUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Nombre'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstUsuarios) => {

        const data = {
            filas: lstUsuarios,
            edita: true,
            elimina: true,
            iniCodigo: 'US'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getUsuario = () => {
        return AthenasNet.Mant.getEntidad([
            'Nombre',
            'Id',
            'accion',
            'Apellido',
            'DNI',
            'Sexo']);
    }

    return {
        getFiltros,
        generarTabla,
        getUsuario
    }
}

