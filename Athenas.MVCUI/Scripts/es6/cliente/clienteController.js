const ClienteController = (service, ui) => {
    let lstClientes = [];
    let cliSeleccionado = {};
    const { Mant } = AthenasNet;

    const muestraClientes = async (filtros = {}) => {
        try {
            lstClientes = await service.listarCliente(filtros);
            ui.generarTabla(lstClientes.map(c => ({
                Id: c.Id,
                Nombre: c.Nombre,
                Apellido: c.Apellido,
                Telefono: c.Telefono,
                Dni: c.Dni,
                Sexo: (c.Sexo === 'M') ? 'Masculino' : 'Femenino'
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

                cliSeleccionado = lstClientes.find(c => c.Id === parseInt(id));
                cliSeleccionado.accion = accion;

                if (accion === 'editar') {
                    Mant.setFormMantenedor(cliSeleccionado, ['FechaCreacion','Activo']);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
    }

    const manejaEnvioCli = () => {

        const formMantenedor = Mant.getFormMantenedor();
            formMantenedor.addEventListener('submit', async (evt) => {
            evt.preventDefault();

                if (formMantenedor.checkValidity()) {

                const cliente = ui.getCliente();
           
                try {
                    if (cliente.accion === 'registrar') {
                        await service.crearCliente(cliente);
                        Mant.cerrarModMant();
                        AthenasNet.muestraToast({ mensaje: 'El cliente se registró satisfactoriamente', titulo: 'Registro exitoso' })
                    }
                    else if (cliente.accion === 'editar') {
                        await service.actualizarCliente(cliente);
                        Mant.cerrarModMant();
                        AthenasNet.muestraToast({ mensaje: 'El cliente se actualizó satisfactoriamente', titulo: 'Actualización exitosa' })
                    }
                    await muestraClientes();
                    }       
                catch (err) {
                    console.error(err);
                    const mensaje = (cliente.accion === 'registrar') ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                    const titulo = (cliente.accion === 'registrar') ? 'Registro erróneo' : 'Actualización errónea';
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
                await service.eliminarCliente(parseInt(cliSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'El cliente fue eliminado satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraClientes();
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
            await muestraClientes(filtros);
        })
    }

    const iniciar = () => {
        muestraClientes();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioCli();
        manejaEnvioConf();
        manejaEnvioFiltro();
    }


    return {
        iniciar
    }
}