const CategoriaController = (service, ui) => {
    let lstCategorias = [];
    let cateSeleccionada = {};
    const { Mant } = AthenasNet;

    const muestraCategorias = async (filtros = {}) => {
        try {
            lstCategorias = await service.listarCategoria(filtros);
            ui.generarTabla(lstCategorias.map(c => ({
                Id: c.Id,
                Descripcion: c.Descripcion
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

                cateSeleccionada = lstCategorias.find(c => c.Id === parseInt(id));
                cateSeleccionada.accion = accion;

                if (accion === 'editar') {
                    Mant.setFormMantenedor(cateSeleccionada);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
    }

    const manejaEnvioCat = () => {

        Mant.getFormMantenedor().addEventListener('submit', async (evt) => {
            evt.preventDefault();

            const categoria = ui.getCategoria();
            try {
                if (categoria.accion === 'registrar') {
                    await service.crearCategoria(categoria);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'La categoría se registró satisfactoriamente', titulo: 'Registro exitoso' })
                }
                else if (categoria.accion === 'editar') {
                    await service.actualizarCategoria(categoria);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'La categoría se actualizó satisfactoriamente', titulo: 'Actualización exitosa' })
                }
                await muestraCategorias();
            }
            catch (err) {
                console.error(err);
                const mensaje = (categoria.accion === 'registrar') ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                const titulo = (categoria.accion === 'registrar') ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: mensaje, titulo: titulo })
            }


        })

    }

    const manejaEnvioConf = () => {
        AthenasNet.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminarCategoria(parseInt(cateSeleccionada.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'La categoría fue eliminada satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraCategorias();
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
            await muestraCategorias(filtros);
        })
    }

    const iniciar = () => {
        muestraCategorias();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioCat();
        manejaEnvioConf();
        manejaEnvioFiltro();
    }


    return {
        iniciar
    }
}