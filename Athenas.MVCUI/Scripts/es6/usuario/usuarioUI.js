
const UsuarioUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Nombre'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstUsuarios) => {
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();
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
            'Id',
            'accion',
            'Nombre',
            'Apellido',
            'Dni',
            'Direccion',
            'Telefono',
            'Email',
            'Sexo',
            'Usuario',
            'Contrasenia',
            'Roles'
        ]);
    }



    return {
        getUsuario,
        generarTabla,
        getFiltros,
        ID_TEMP_ROL: 'temp-lst-rol',
        SEL_CBO_ROL: '#form-mantenedor #cbo-roles'
    }
}