const conValidacionRoles = async (controlador, parametros = []) => {

    let rolesActuales = [];
    let esVendedor = false;
    //usuarioService

    const usuarioService = UsuarioService();
    //obtengo roles
    try {
        rolesActuales = await usuarioService.rolesActuales();
        debugger
        esVendedor = (rolesActuales.length === 1 && rolesActuales[0].Nombre === 'Vendedor')
    }
    catch (err) {
        console.error(err)
    }


    return controlador(...parametros, { rolesActuales, esVendedor });

    //controlador(service,ui,null,null, {esVendedor, rolesActuales})
}
