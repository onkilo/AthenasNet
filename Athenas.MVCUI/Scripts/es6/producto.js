
const ProductoService = () => {

    const crear = async (producto) => {
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(producto),
            url: 'Producto/Crear'
        })

        return respuesta;
    }

    const actualizar = async (producto) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(producto),
            url: 'Producto/Actualizar'
        })

        return respuesta;
    }

    const listar = async (filtros) => {

        const filtrosDefecto = {
            Descripcion: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Producto/Listar'
        })

        return respuesta.Data;
    }

    const eliminar = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Producto/Eliminar'
        })
        return respuesta
    }

    const buscar = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Producto/Obtener'
        })
        return respuesta;

    }

    return {
        crear,
        actualizar,
        listar,
        eliminar,
        buscar
    }
}

const ProductoUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Descripcion'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstProductos) => {

        const data = {
            filas: lstProductos,
            edita: true,
            elimina: true
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getProducto = () => {
        return AthenasNet.Mant.getEntidad([
            'Descripcion',
            'Id',
            'accion',
            'PrecioCompra',
            'PrecioVenta',
            'StockActual',
            'StockMin',
            'Imagen']);
    }

    return {
        getProducto,
        generarTabla,
        getFiltros
    }
}

const ProductoController = (service, ui) => {
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
        Mant.getTblMantenedor().addEventListener('click', (evt) => {

            if (evt.target.dataset.id) {
                const { id, accion } = evt.target.dataset;

                prodSeleccionado = lstProductos.find(c => c.Id === parseInt(id));
                prodSeleccionado.accion = accion;

                if (accion === 'editar') {
                    Mant.setFormMantenedor(prodSeleccionado);
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

            const producto = ui.getProducto();
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

    const iniciar = () => {
        muestraProductos();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioProd();
        manejaEnvioConf();
        manejaEnvioFiltro();
    }


    return {
        iniciar
    }
}



window.addEventListener('load', () => {

    const service = ProductoService();

    const ui = ProductoUI();

    const controller = ProductoController(service, ui);

    controller.iniciar();

})