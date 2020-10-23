
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
    const IDFORMCATEGORIA = 'form-categoria';
    const SELTBLBODY = '#tb-categoria tbody';
    const SELMODALCATE = '#modal-categoria';
    const IDFORMFILTRAR = 'form-filtrar';

    const getTblCategoria = () => document.querySelector(SELTBLCATEGORIA);

    const getBtnNuevo = () => document.querySelector(SELBTNNUEVO);

    const getFormCategoria = () => document.getElementById(IDFORMCATEGORIA);

    const getFormCateElements = () => getFormCategoria().elements;

    const getFormEleValue = (ele) => getFormCateElements()[ele].value;

    const setFormEleValue = (ele, value) => { getFormCateElements()[ele].value = value; }


    const getFormFiltrar = () => document.getElementById(IDFORMFILTRAR);

    const getFiltros = () => {
        const elementosFormulario = getFormFiltrar().elements;

        const arrFiltros = ['Descripcion'];

        let filtros = {};

        arrFiltros.forEach(fil => {
            filtros = {
                ...filtros,
                [fil]: elementosFormulario[fil].value
            }
        })


        return filtros;

    }

    const generarTabla = (lstCategorias) => {
        AthenasNet.compilaTemplate('temp-tbl-body', { filas: lstCategorias }, SELTBLBODY);
        $(SELTBLCATEGORIA).DataTable();
    }

    const muestraCategoria = (categoria) => {
        setFormEleValue('Descripcion', categoria.Descripcion);
        setFormEleValue('Id', categoria.Id);
        setFormEleValue('accion', categoria.accion);
        $(SELMODALCATE).modal('show');
    }

    const evtMostrarModCategoria = (evt) => {
        $(SELMODALCATE).on('hide.bs.modal', () => {
            limpiarCategoria();
        })
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
        const categoria = {
            Descripcion: getFormEleValue('Descripcion'),
            Id: parseInt(getFormEleValue('Id')),
            accion: getFormEleValue('accion')
        };

        return categoria;
    }

    const limpiarCategoria = () => {
        const elementosFormulario = getFormCateElements();

        const arrFiltros = ['Descripcion'];

        arrFiltros.forEach(fil => {
            elementosFormulario[fil].value = '';
        })

        elementosFormulario['Id'].value = '0';
        elementosFormulario['accion'].value = 'registrar';
        
    }

    return {
        getTblCategoria,
        getBtnNuevo,
        getFormCategoria,
        getFormEleValue,
        setFormEleValue,
        generarTabla,
        evtMostrarModCategoria,
        muestraCategoria,
        limpiarModalCat,
        getCategoria,
        cerrarModCate,
        getFormFiltrar,
        getFiltros,
        limpiarCategoria
    }
}

const CategoriaController = (service, ui) => {
    let lstCategorias = [];
    let cateSeleccionada = {};


    const muestraCategorias = async (filtros = {}) => {
        try {
            lstCategorias = await service.listarCategoria(filtros);
            ui.generarTabla(lstCategorias);
        }
        catch (err) {
            console.error(err);
        }
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
                    AthenasNet.mostrarConfirmacion();
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
                    ui.cerrarModCate();
                    AthenasNet.muestraToast({mensaje: 'La categoría se registró satisfactoriamente',titulo: 'Registro exitoso'})
                }
                else if (categoria.accion === 'editar') {
                    await service.actualizarCategoria(categoria);
                    ui.cerrarModCate();
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
        ui.getFormFiltrar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            const filtros = ui.getFiltros();
            await muestraCategorias(filtros);
        })
    }

    const iniciar = () => {
        muestraCategorias();
        ui.evtMostrarModCategoria();
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