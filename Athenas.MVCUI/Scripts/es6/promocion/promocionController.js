
const ProductoController = (service, ui, productoService) => {
    let lstPromociones = [];
    let promSeleccionado = {};
    const { Mant } = AthenasNet;

    const muestraPromociones = async (filtros = {}) => {
        try {
            lstPromociones = await service.listar(filtros);
            ui.generarTabla(lstPromociones.map(p => ({
                Id: p.Id,
                Producto: p.Producto.Descripcion,
                Tipo: (p.Tipo === 0) ? 'Fijo' : 'Porcentual',
                Valor: (p.Tipo === 0) ? `S/. ${p.Valor.toFixed(2)}` : `% ${p.Valor.toFixed(2)}`,
                FechaInicio: AthenasNet.formatFecha(p.FFechaInicio),
                FechaFin: AthenasNet.formatFecha(p.FFechaFin)
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

                promSeleccionado = lstPromociones.find(c => c.Id === parseInt(id));
                promSeleccionado.accion = accion;

                if (accion === 'editar') {
                    await muestraPoductos();
                    Mant.setFormMantenedor(
                        {
                            ...promSeleccionado,
                            Producto: promSeleccionado.Producto.Id,
                            FechaFin: promSeleccionado.FFechaFin,
                            FechaInicio: promSeleccionado.FFechaInicio
                        },
                        ['Activo', 'FFechaInicio', 'FFechaFin']);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
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
                await muestraPromociones();
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
                await service.eliminar(parseInt(promSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'La promoción fue eliminada satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraPromociones();
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
            await muestraPromociones(filtros);
        })
    }


    const muestraPoductos = async () => {
        const lstProductos = await productoService.listar({});
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
        muestraPromociones();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioProm();
        manejaEnvioConf();
        manejaEnvioFiltro();
        debugger
        manejaAbreModal();
    }


    return {
        iniciar
    }
}
