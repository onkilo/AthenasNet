(function () {

    const SELTBLCATEGORIA = '#tb-categoria';
    const SELBTNNUEVO = '#btn-nuevo';
    const IDFORMCATEGORIA = 'form-categoria';
    const SELTBLBODY = '#tb-categoria tbody';
    const SELMODALCATE = '#modal-categoria';
    const IDFORMFILTRAR = 'form-filtrar';

    const getTblCrud = () => document.querySelector(SELTBLCATEGORIA);

    const getBtnNuevo = () => document.querySelector(SELBTNNUEVO);

    const getFormCrud = () => document.getElementById(IDFORMCATEGORIA);

    const getFormCrudElements = () => getFormCrud().elements;

    const getFormEleValue = (ele) => getFormCrudElements()[ele].value;

    const setFormEleValue = (ele, value) => { getFormCrudElements()[ele].value = value; }


    const getFormFiltrar = () => document.getElementById(IDFORMFILTRAR);

    const getFiltros = (arrFiltros) => {
        const elementosFormulario = getFormFiltrar().elements;
        
        let filtros = {};

        arrFiltros.forEach(fil => {
            filtros = {
                ...filtros,
                [fil]: elementosFormulario[fil].value
            }
        })


        return filtros;

    }

    const generarTabla = (filas) => {
        AthenasNet.compilaTemplate('temp-tbl-body', { filas: filas }, SELTBLBODY);
        $(SELTBLCATEGORIA).DataTable();
    }

    const setFormCrud = (entidad, arrFormEle) => {
        
        $(SELMODALCATE).modal('show');
    }

    const evtMostrarModCategoria = (evt) => {
        $(SELMODALCATE).on('hide.bs.modal', () => {
            limpiarForm();
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

    const limpiarForm = () => {
        const elementosFormulario = getFormCrudElements();

        //const arrFiltros = ['Descripcion'];

        //arrFiltros.forEach(fil => {
        //    elementosFormulario[fil].value = '';
        //})
        getFormCrud().reset();
        const { Id = null, accion = null } = elementosFormulario;
        if (Id) {
            elementosFormulario['Id'].value = '0';
        }

        if (accion) {
            elementosFormulario['accion'].value = 'registrar';
        }
       
    }

    window.AthenasNet = {
        ...window.AthenasNet
    }
})()