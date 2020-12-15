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

    const setFormEleValue = (ele, value, readonly = false) => {
        const htmlEle = getFormMantElements()[ele];
        htmlEle.value = value;
        htmlEle.readOnly = readonly;
        console.log(getFormMantElements()[ele].readOnly)
    }

    const setFormMantenedor = (entidad, arrExcepciones = [], readonly = false) => {
        const elementos = Object.keys(entidad);

        elementos.forEach(ele => {
            if (arrExcepciones.includes(ele)) return; 

            setFormEleValue(ele, entidad[ele], readonly);
        })

        if (readonly) {
            document.querySelector('#btn-modal-mant-guardar').style.display = 'none';
        }

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

    const getEntidad = (arrEle) => {
        const elementosFormulario = getFormMantElements();

        let entidad = {};

        arrEle.forEach(ele => {
            if (elementosFormulario[ele].selectedOptions) {
                console.dir(Array.from(elementosFormulario[ele].selectedOptions).map((s) => s.value));
            }
            
            entidad = {
                ...entidad,
                [ele]: (elementosFormulario[ele].multiple)
                        ? Array.from(elementosFormulario[ele].selectedOptions).map((s) => s.value)
                        : elementosFormulario[ele].value
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

    const configuraTamModal = (clase) => {
        const modal = $(SEL_MODAL_CATE + " .modal-dialog");
        modal.addClass(clase);
       
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
        configuraTamModal
    };
})()