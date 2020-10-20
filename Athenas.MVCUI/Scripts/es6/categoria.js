
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

    const SELTBLCATEGORIA = '#tb-categoria';
    const SELBTNNUEVO = '#btn-nuevo';
    //const IDFORMCATEGORIA = 'form-categoria';
    const IDFORMCATEGORIA = 'main-form';
    const IDFORMCONFIRMAR = 'form-confirmar';
    const SELTBLBODY = '#tb-categoria tbody';
    const SELMODALCATE = '#modal-main-form';
    //const SELMODALCATE = '#modal-categoria';
    const SELMODALCONF = '#modal-confirmar';
    const IDFORMFILTRAR = 'form-filtrar';
    

    const getTblCategoria = () => document.querySelector(SELTBLCATEGORIA);

    const getBtnNuevo = () => document.querySelector(SELBTNNUEVO);

    const getFormCategoria = () => document.getElementById(IDFORMCATEGORIA);

    const getFormCateElements = () => getFormCategoria().elements;

    const getFormEleValue = (ele) => getFormCateElements()[ele].value;

    const setFormEleValue = (ele, value) => { getFormCateElements()[ele].value = value; }

    const getFormConfirmar = () => document.getElementById(IDFORMCONFIRMAR);

    const getFormFiltrar = () => document.getElementById(IDFORMFILTRAR);

    const getFiltros = () => {
        const ARRFILTROS = ['Descripcion'];

        const formFiltro = getFormFiltrar();

        let filtros = {};

        ARRFILTROS.forEach(fil => {
            filtros = {
                ...filtros,
                [fil]: formFiltro[fil].value
            }
        });
        

        return filtros;
    }

    const generarTabla = (lstCategorias) => {
        const dataTemplate = {
            filas: lstCategorias,
            edita: true,
            elimina: true
        }
        AthenasNet.compilaTemplate('temp-tbl-body', dataTemplate, SELTBLBODY);
        $(SELTBLCATEGORIA).DataTable()
    }

    const muestraCategoria = (categoria) => {
        //setFormEleValue('Descripcion', categoria.Descripcion);
        //setFormEleValue('Id', categoria.Id);
        //setFormEleValue('accion', categoria.accion);
        AthenasNet.setEntidad(categoria)
        $(SELMODALCATE).modal('show');
    }

    const evtMostrarModCategoria = (evt) => {
        $(SELMODALCATE).on('show.bs.modal', evt)
    }

    const mostrarConfirmacion = () => {
        $(SELMODALCONF).modal('show');
    }

    const ocultarConfirmacion = () => {
        $(SELMODALCONF).modal('hide');
    }

    const cerrarModCate = () => {
        $(SELMODALCATE).modal('hide');
    }

    const limpiarModalCat = () => {
        setFormEleValue('Descripcion', '');
        setFormEleValue('Id', '0');
        setFormEleValue('accion', 'registrar');

    }

    const getCategoria = () => {
        const arrCampos = ['Descripcion']
        const categoria = AthenasNet.getEntidad(arrCampos);
        return categoria;
    }

    return {
        getTblCategoria,
        getBtnNuevo,
        getFormCategoria,
        getFormConfirmar,
        getFormEleValue,
        setFormEleValue,
        generarTabla,
        evtMostrarModCategoria,
        muestraCategoria,
        mostrarConfirmacion,
        limpiarModalCat,
        getCategoria,
        cerrarModCate,
        ocultarConfirmacion,
        getFormFiltrar,
        getFiltros
    }
}

const CategoriaController = (service, ui) => {
    let lstCategorias = [];
    let cateSeleccionada = {};


    const muestraCategorias = async (filtros) => {
        try {
            lstCategorias = await service.listarCategoria(filtros ? filtros : {});
            ui.generarTabla(lstCategorias);
        }
        catch (err) {
            console.error(err);
            AthenasNet.muestraToast({ className: 'bg-danger', mensaje: 'Hubo un error al obtener las categorías', titulo: 'Error' })
        }
    }

    const configModalCate = () => {
        ui.evtMostrarModCategoria((e) => {
            if (ui.getFormEleValue('accion') === 'registrar') {
                ui.setFormEleValue('Descripcion', '');
                ui.setFormEleValue('Id', 0);
            }
        });
    }

    const manejaEvtTabla = () => {
        ui.getTblCategoria().addEventListener('click', (evt) => {

            if (evt.target.dataset.id) {
                const { id, accion } = evt.target.dataset;

                cateSeleccionada = lstCategorias.find(c => c.Id === parseInt(id));
                cateSeleccionada.accion = accion;

                if (accion === 'editar') {
                    ui.muestraCategoria(cateSeleccionada);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    ui.mostrarConfirmacion();
                }
            }


        });
    }

    const manejaEnvioCat = () => {

        ui.getFormCategoria().addEventListener('submit', async (evt) => {
            evt.preventDefault();

            const categoria = ui.getCategoria();
            try {
                if (categoria.accion === 'registrar') {
                    await service.crearCategoria(categoria);
                    AthenasNet.muestraToast({className: 'bg-success', mensaje: 'Categoría registrada exitosamente'})
                }
                else if (categoria.accion === 'editar') {
                    await service.actualizarCategoria(categoria);
                    AthenasNet.muestraToast({ className: 'bg-success', mensaje: 'Categoría actualizada exitosamente' })
                }

                //ui.limpiarModalCat();
                //ui.cerrarModCate();
                AthenasNet.limpiarMainForm();
                AthenasNet.cerrarModalMainform();
                await muestraCategorias();
            }
            catch (err) {
                console.error(err);
                AthenasNet.muestraToast({ className: 'bg-danger', mensaje: 'No se pudo realizar la operación', titulo: 'Error' })
            }

        })

    }

    const manejaEnvioConf = () => {
        ui.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminarCategoria(parseInt(cateSeleccionada.Id));
                ui.ocultarConfirmacion();
                AthenasNet.muestraToast({ className: 'bg-success', mensaje: 'Categoría eliminada satisfactoriamente'})
            }
            catch (err) {
                console.error(err);
                AthenasNet.muestraToast({ className: 'bg-danger', mensaje: 'No se pudo eliminar la categoría', titulo: 'Error' })
            }
            muestraCategorias();
        })
    }

    const manejaEnvioFiltro = () => {
        ui.getFormFiltrar().addEventListener('submit',async (evt) => {
            evt.preventDefault();
            const filtros = ui.getFiltros();
            await muestraCategorias(filtros)
        })
    }

    const iniciar = () => {
        muestraCategorias();
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