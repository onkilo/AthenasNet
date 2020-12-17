const UsuarioController = (service, ui) => {

    let cuenta = {};

    const evtFormCuenta = () => {
        ui.getFormCuenta().addEventListener('submit', async (evt) => {
            debugger
            evt.preventDefault();
            cuenta = ui.getCuenta();

            try {
                await service.actualizarCuenta(cuenta);
                AthenasNet.muestraToast({ cssClass: 'bg-success', mensaje: 'Datos actualizados', titulo: 'Éxito' })
            }
            catch (err) {
                console.error(err);
            }

        })
    }



    const iniciar = () => {
        evtFormCuenta();
    }


    return {
        iniciar
    }
}

