(function () {

    const ID_FORM_FILTRAR = 'form-filtrar';
    const SEL_BTN_NUEVO = '#btn-nuevo';
    const SEL_TBL_MANT = '#tb-mantenedor';
    const SEL_TBL_BODY = '#tb-mantenedor tbody';
    const ID_FORM_CATEGORIA = 'form-mantenedor';
    const SEL_MODAL_CATE = '#modal-mantenedor';

    const getTblMantenedor = () => document.querySelector(SEL_TBL_MANT);

    const getBtnNuevo = () => document.querySelector(SEL_BTN_NUEVO);

    const getFormFiltrar = () => document.getElementById(ID_FORM_FILTRAR);

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

    const getFormMantenedor = () => document.getElementById(ID_FORM_CATEGORIA);

    const getFormMantElements = () => getFormMantenedor().elements;

    const getFormEleValue = (ele) => getFormMantElements()[ele].value;

    const setFormEleValue = (ele, value) => { getFormMantElements()[ele].value = value; }

    const setFormMantenedor = (entidad, arrExcepcion = []) => {
        const elementos = Object.keys(entidad);

        elementos.forEach(ele => {
            if (arrExcepcion.includes(ele)) return;
            setFormEleValue(ele, entidad[ele]);
        })


        $(SEL_MODAL_CATE).modal('show');
    }

    const evtMostrarModMant = (evt) => {
        $(SEL_MODAL_CATE).on('hide.bs.modal', () => {
            limpiarFormMant();
        })
    }

    const cerrarModMant = () => {
        $(SEL_MODAL_CATE).modal('hide');
    }

    const cambiaTamañoModal = (clase) => {
        $(SEL_MODAL_CATE + " .modal-dialog").addClass(clase);
    }

    const getEntidad = (arrEle) => {
        const elementosFormulario = getFormMantElements();

        let entidad = {};

        arrEle.forEach(ele => {
            entidad = {
                ...entidad,
                [ele]: elementosFormulario[ele].value
            }
        })


        return entidad;
    }

    const limpiarFormMant = () => {
        const elementosFormulario = getFormMantElements();

        getFormMantenedor().reset();

        const { Id = null, accion = null } = elementosFormulario;

        if (Id) {
            elementosFormulario['Id'].value = '0';
        }

        if (accion) {
            elementosFormulario['accion'].value = 'registrar';
        }

    }

    window.AthenasNet.Mant = {
        getFormFiltrar,
        getFiltros,
        getTblMantenedor,
        getBtnNuevo,
        getFormEleValue,
        setFormMantenedor,
        evtMostrarModMant,
        cerrarModMant,
        getEntidad,
        getFormMantenedor,
        SEL_TBL_BODY,
        SEL_TBL_MANT,
        cambiaTamañoModal
    };
})()