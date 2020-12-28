const EditarCuentaController = (service, ui) => {

    let cuenta = {};

    const evtFormEditarCuenta = () => {
        ui.getFormEditarUsuario().addEventListener('submit', async (evt) => {

            evt.preventDefault();

            cuenta = ui.getCuenta();

            console.log(cuenta);
            
            try {
                await service.editarCuenta(cuenta);
                AthenasNet.muestraToast({ cssClass: 'bg-success', mensaje: 'Datos editados satisfactoriamente', titulo: 'Éxito' })
            }
            catch (err) {
                console.error(err);
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: 'Hubo un problema al editar los datos de la cuenta', titulo: 'Error' })
            }
        })
    }

    const iniciar = () => {
        evtFormEditarCuenta();
    }

    return {
        iniciar
    }
}