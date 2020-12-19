const InicioController = (usuarioService, ui) => {

    let infoPrincipal = {};
    let rolesActuales = [];

    const muestraInfoPrincipal = async () => {
        infoPrincipal = await usuarioService.infoPrincipal();

        ui.setCantidades(infoPrincipal)

        ui.setProdBajoStockData({
            filas: infoPrincipal.ProdBajoStock
        })

        ui.setPromoActualData({
            filas: infoPrincipal.PromosActuales.map(promo => {

                return {
                    Producto: {
                        Descripcion: promo.Producto.Descripcion
                    },
                    Descuento: (promo.Tipo === 0) ? AthenasNet.formatPrecio(promo.Valor) : `% ${promo.Valor.toFixed(2)}`

                }
            })

        })

        console.log(infoPrincipal);
    }

    const validacionUI = () => {
        if (rolesActuales.length === 1 && rolesActuales[0].Nombre === 'Vendedor') {
            ui.muestraVendedor();
        }
        
    }

    const getRolesActuales = async () => {
        try {
            rolesActuales = await usuarioService.rolesActuales();
        }
        catch (err) {
            console.error(err)
        }
    }

    const iniciar = async () => {
        await getRolesActuales();
        await muestraInfoPrincipal();
        validacionUI();
    }

    return {
        iniciar
    }
}