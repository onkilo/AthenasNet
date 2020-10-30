
const ProductoController = (service, ui, categoriaService) => {
    let lstProductos = [];
    let prodSeleccionado = {};
    const { Mant } = AthenasNet;

    const muestraProductos = async (filtros = {}) => {
        try {
            lstProductos = await service.listar(filtros);
            ui.generarTabla(lstProductos.map(p => ({
                Id: p.Id,
                Descripcion: p.Descripcion,
                PrecioCompra: p.PrecioCompra,
                PrecioVenta: p.PrecioVenta,
                StockActual: p.StockActual,
                StockMin: p.StockMin,
                Categoria: p.Categoria.Descripcion
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

                prodSeleccionado = lstProductos.find(c => c.Id === parseInt(id));
                prodSeleccionado.accion = accion;

                if (accion === 'editar') {
                    await muestraCategorias();
                    Mant.setFormMantenedor({ ...prodSeleccionado, Categoria: prodSeleccionado.Categoria.Id }, ['Imagen', 'Activo', 'Base64Imagen']);
                    ui.getImgDisplay().src = prodSeleccionado.Imagen;
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
    }

    const manejaEnvioProd = () => {

        Mant.getFormMantenedor().addEventListener('submit', async (evt) => {
            evt.preventDefault();

            let producto = ui.getProducto();
            if (ui.getImgDisplay().src.startsWith('data')) {
                producto.Base64Imagen = ui.getImgDisplay().src;
            }

            delete producto.Imagen;
            producto = {
                ...producto,
                Categoria: {
                    Id: parseInt(producto.Categoria)
                }
            }
            console.log(producto);
            try {
                if (producto.accion === 'registrar') {
                    await service.crear(producto);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'El producto se registró satisfactoriamente', titulo: 'Registro exitoso' })
                }
                else if (producto.accion === 'editar') {
                    await service.actualizar(producto);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'El producto se actualizó satisfactoriamente', titulo: 'Actualización exitosa' })
                }
                await muestraProductos();
            }
            catch (err) {
                console.error(err);
                const mensaje = (producto.accion === 'registrar') ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                const titulo = (producto.accion === 'registrar') ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: mensaje, titulo: titulo })
            }


        })

    }

    const manejaEnvioConf = () => {
        AthenasNet.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminar(parseInt(prodSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'El producto fue eliminado satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraProductos();
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
            await muestraProductos(filtros);
        })
    }

    const manejaImgInput = () => {
        ui.getImgInput().addEventListener('input', async (evt) => {
            console.dir(evt.target);
            try {
                const url = await ui.getBase64Data(evt.target.files[0]);
                ui.getImgDisplay().src = url;

            }
            catch (err) {
                console.error(err);
            }

        });
    }

    const muestraCategorias = async () => {
        const lstCategorias = await categoriaService.listarCategoria({});
        const tempCatData = {
            filas: lstCategorias
        }
        console.log(lstCategorias);
        AthenasNet.compilaTemplate(ui.ID_TEMP_CAT, tempCatData, ui.SEL_CBO_CAT);
    }

    const manejaAbreModal = async () => {
        Mant.getBtnNuevo().addEventListener('click', () => {
            await muestraCategorias();
        })
    }

    const iniciar = () => {
        Mant.configuraTamModal('modal-lg');
        muestraProductos();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioProd();
        manejaEnvioConf();
        manejaEnvioFiltro();
        manejaImgInput();
        manejaAbreModal();
    }


    return {
        iniciar
    }
}
