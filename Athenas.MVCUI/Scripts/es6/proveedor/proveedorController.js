const ProveedorController = (service, ui) => {
    let lstProveedores = [];
    let proveSeleccionado = {};
    const { Mant } = AthenasNet;

    const muestraProveedores = async (filtros = {}) => {
        try {
            lstProveedores = await service.listarProveedor(filtros);
            ui.generarTabla(lstProveedores.map(c => ({
                Id: c.Id,
                RzSocial: c.RzSocial,
                RUC: c.RUC,
                Representante: c.Representante,
                Email: c.Email,
                Telefono: c.Telefono,
                Direccion: c.Direccion
            })));
        }
        catch (err) {
            console.error(err);
        }
    }

    const manejaEvtTabla = () => {
        Mant.getTblMantenedor().addEventListener('click', (evt) => {

            if (evt.target.dataset.id) {
                const { id, accion } = evt.target.dataset;

                proveSeleccionado = lstProveedores.find(c => c.Id === parseInt(id));
                proveSeleccionado.accion = accion;

                if (accion === 'editar') {
                    Mant.setFormMantenedor(proveSeleccionado, ['Activo']);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
    }


    const manejaEnvioProve = () => {

        const formMantenedor = Mant.getFormMantenedor();
        formMantenedor.addEventListener('submit', async (evt) => {
            evt.preventDefault();
            if (formMantenedor.checkValidity()) {

                const proveedor = ui.getProveedor();

            try {
                if (proveedor.accion === 'registrar') {
                    await service.crearProveedor(proveedor);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'El proveedor se registró satisfactoriamente', titulo: 'Registro exitoso' })
                }
                else if (proveedor.accion === 'editar') {
                    await service.actualizarProveedor(proveedor);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'El proveedor se actualizó satisfactoriamente', titulo: 'Actualización exitosa' })
                }
                await muestraProveedores();
            }
            catch (err) {
                console.error(err);
                const mensaje = (proveedor.accion === 'registrar') ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                const titulo = (proveedor.accion === 'registrar') ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: mensaje, titulo: titulo })
            }

            }
            else {
                Mant.esFormularioValido(false);
            }
        })

    }


    const manejaEnvioConf = () => {
        AthenasNet.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminarProveedor(parseInt(proveSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'El proveedor fue eliminado satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraProveedores();
            }
            catch (err) {
                console.error(err);
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: 'Hubo un error en la eliminación', titulo: 'Eliminación errónea' })
            }

        })
    }

    const manejaEnvioFiltro = () => {
        Mant.getFormFiltrar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            const filtros = ui.getFiltros();
            await muestraProveedores(filtros);
        })
    }

    const iniciar = () => {
        muestraProveedores();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioProve();
        manejaEnvioConf();
        manejaEnvioFiltro();
    }


    return {
        iniciar
    }
}