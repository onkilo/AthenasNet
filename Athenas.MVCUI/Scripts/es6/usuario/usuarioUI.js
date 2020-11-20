const UsuarioUI = () => {

    const ID_TEMP_ROL = 'temp-lst-roles';
    const SEL_CBO_ROL = '#cbo-roles';

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
            'Dni',
            'Sexo',
            'Roles',
            'Direccion',
            'Email',
            'Usuario',
            'Contrasenia',
            'Telefono'
        ]);
    }

    return {
        getFiltros,
        generarTabla,
        getUsuario,
        ID_TEMP_ROL,
        SEL_CBO_ROL
    }
}

