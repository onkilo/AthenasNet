
const UsuarioController = (service, ui, rolService) => {
    let lstUsuarios = [];
    let usuSeleccionado = {};
    let lstRoles = {};
    const { Mant } = AthenasNet;

    const muestraUsuarios = async (filtros = {}) => {
        try {
            lstUsuarios = await service.listar(filtros);
            ui.generarTabla(lstUsuarios.map(p => ({
                Id: p.Id,
                Producto: p.Producto.Descripcion,
                Tipo: (p.Tipo === 0) ? 'Fijo' : 'Porcentual',
                Valor: (p.Tipo === 0) ? `S/. ${p.Valor.toFixed(2)}` : `% ${p.Valor.toFixed(2)}`,
                FechaInicio: formatFecha(p.FFechaInicio),
                FechaFin: formatFecha(p.FFechaFin)
            })));
        }
        catch (err) {
            console.error(err);
        }
    }

    const manejaEvtTabla = () => {
        Mant.getTblMantenedor().addEventListener('click', async (evt) => {

            if (evt.target.dataset.id) {
                const { id, accion } = evt.target.dataset;

                usuSeleccionado = lstUsuarios.find(c => c.Id === parseInt(id));
                usuSeleccionado.accion = accion;
                console.log(new Date(usuSeleccionado.FFechaInicio + ' 00:00:00'))
                if (accion === 'editar') {
                    await muestraPoductos();
                    Mant.setFormMantenedor(
                        {
                            ...usuSeleccionado,
                            Valor: parseFloat(usuSeleccionado.Valor).toFixed(2),
                            Producto: usuSeleccionado.Producto.Id,
                            FechaFin: usuSeleccionado.FFechaFin,
                            FechaInicio: usuSeleccionado.FFechaInicio
                        }, ['Activo', 'FFechaInicio', 'FFechaFin']);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
    }

    const formatFecha = (fecha) => {

        //yyyy-MM-dd
        const arrElementos = fecha.split('-');
        const nuevaFecha = arrElementos.reverse().join('/');
        return nuevaFecha;
    }

    const manejaEnvioProm = () => {

        Mant.getFormMantenedor().addEventListener('submit', async (evt) => {
            evt.preventDefault();

            let promocion = ui.getPromocion();
            promocion = {
                ...promocion,
                Producto: {
                    Id: parseInt(promocion.Producto)
                }
            }
            console.log(promocion);
            try {
                if (promocion.accion === 'registrar') {
                    await service.crear(promocion);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'La promoción se registró satisfactoriamente', titulo: 'Registro exitoso' })
                }
                else if (promocion.accion === 'editar') {
                    await service.actualizar(promocion);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'La promoción se actualizó satisfactoriamente', titulo: 'Actualización exitosa' })
                }
                await muestraUsuarios();
            }
            catch (err) {
                console.error(err);
                const mensaje = (promocion.accion === 'registrar') ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                const titulo = (promocion.accion === 'registrar') ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: mensaje, titulo: titulo })
            }


        })

    }

    const manejaEnvioConf = () => {
        AthenasNet.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminar(parseInt(usuSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'La promoción fue eliminada satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraUsuarios();
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
            await muestraUsuarios(filtros);
        })
    }


    const muestraPoductos = async () => {
        const lstProductos = await rolService.listar({});
        const tempCatData = {
            filas: lstProductos
        }
        console.log(lstProductos);
        AthenasNet.compilaTemplate(ui.ID_TEMP_PROD, tempCatData, ui.SEL_CBO_PROD);
    }

    const manejaAbreModal = () => {
        Mant.getBtnNuevo().addEventListener('click', async () => {
            await muestraPoductos();
        })
    }

    const iniciar = () => {
        Mant.configuraTamModal('modal-lg');
        muestraUsuarios();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioProm();
        manejaEnvioConf();
        manejaEnvioFiltro();
        manejaAbreModal();
    }


    return {
        iniciar
    }
}