
const CategoriaService = () => {

    const crearCategoria = async (categoria) => {
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(categoria),
            url: 'Categoria/Crear'
        })

        return respuesta;
    }

    const actualizarCategoria = async (categoria) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(categoria),
            url: 'Categoria/Actualizar'
        })

        return respuesta;
    }

    const listarCategoria = async (filtros) => {

        const filtrosDefecto = {
            Descripcion: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Categoria/Listar'
        })

        return respuesta.Data;
    }

    const eliminarCategoria = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Eliminar'
        })
        return respuesta
    }

    const buscarCategoria = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Obtener'
        })
        return respuesta;
           
    }

    return {
        crearCategoria,
        actualizarCategoria,
        listarCategoria,
        eliminarCategoria,
        buscarCategoria
    }
}

const CategoriaUI = () => {
  
    const getFiltros = () => {
        const arrFiltros = ['Descripcion'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstCategorias) => {

        const data = {
            filas: lstCategorias,
            edita: true,
            elimina: true,
            iniFormato: 'C'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getCategoria = () => {
        return AthenasNet.Mant.getEntidad(['Descripcion', 'Id', 'accion']);
    }

    return {
        getCategoria,
        generarTabla,
        getFiltros
    }
}

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
                    AthenasNet.muestraToast({mensaje: 'La categoría se registró satisfactoriamente',titulo: 'Registro exitoso'})
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
                AthenasNet.muestraToast({ cssClass:'bg-danger', mensaje: 'Hubo un error en la eliminación', titulo: 'Eliminación errónea' })
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



window.addEventListener('load', () => {

    const service = CategoriaService();

    const ui = CategoriaUI();

    const controller = CategoriaController(service, ui);

    controller.iniciar();

})