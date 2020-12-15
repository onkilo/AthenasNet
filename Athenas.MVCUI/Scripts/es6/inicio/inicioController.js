const InicioController = (ui, usuarioService) => {

    let lstRoles = [];

    const muestraInfoPrincipal = async () => {
        try {
            const infoPrincipal = await usuarioService.infoPrincipal();
            ui.setCantCliente(infoPrincipal.CantClientes);
            ui.setCantProducto(infoPrincipal.CantProductos);
            ui.setCantUsuario(infoPrincipal.CantUsuarios);
            ui.setCantVenta(infoPrincipal.CantVentas);
            ui.setPromoData({
                filas: infoPrincipal.PromosActuales.map(prom => (
                    {
                        Producto: prom.Producto,
                        FDescuento: (prom.Tipo === 0) ? AthenasNet.formatPrecio(prom.Valor) : `% ${prom.Valor.toFixed(2)}`                
                    }))
            });
            ui.setProductoData({
                filas: infoPrincipal.ProductosBajoStock
            });
            console.log(infoPrincipal)
        }
        catch (err) {
            console.error(err);
            AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: 'Error al obtener la información', titulo: 'Error' })
        }
    }

    const validacionUI = async () => {

        try {
            lstRoles = await usuarioService.rolesActuales();
            console.log(lstRoles);

            if (lstRoles.length == 1 && lstRoles[0].Nombre === 'Vendedor') {
                ui.ocultarVendedor();
            }

        }
        catch (err) {
            console.error(err);
        }
        


    }

    const iniciar = async () => {
        await validacionUI()
        muestraInfoPrincipal();
    }

    return {
        iniciar
    }
}