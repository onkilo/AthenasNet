(function () {

    const MVC_URL_BASE = 'http://localhost:62622/';
    const ACCION_MOSTRAR_SPINNER = 'mostrar';
    const ACCION_OCULTAR_SPINNER = 'ocultar';

    const ACCION_MOSTRAR_TOAST = 'mostrar';
    const ACCION_OCULTAR_TOAST = 'ocultar';

    const ID_MAIN_FORM = 'main-form';


    const llamadaApi = async (opciones) => {

        const opcionsDefecto = {
            beforeSend: function () {
                manejaSpinner(ACCION_MOSTRAR_SPINNER);
            },
            contentType: 'application/json',
            data: {},
            type: 'GET'
        };
        
        
        try {
            const respuesta = await $.ajax({
                ...opcionsDefecto,
                ...opciones,
                url: MVC_URL_BASE + opciones.url
            });

            if (respuesta.Codigo !== 200) {
                throw respuesta;
            }

            return respuesta;
        }
        catch (err) {
            throw err;
        }
        finally {
            //ocultar spinner
            manejaSpinner(ACCION_OCULTAR_SPINNER);
        }

    }

    const manejaSpinner = (estado) => {

        const spinner = document.querySelector('.spinner-container');

        if (estado === 'mostrar') spinner.style.display = 'flex';
        else spinner.style.display = 'none';
    }


    const muestraToast = ({ className = 'bg-success', mensaje = 'Operación realizada con éxito', titulo = 'Éxito' }) => {
        const TOAST_ID = '#general-toast';
        const TOAST_ID_MSJ = '#toast-mensaje';
        const TOAST_ID_TITULO = '#toast-titulo';

        const toast = document.querySelector(TOAST_ID);

        const toastMsjBody = document.querySelector(TOAST_ID_MSJ);
        const toastMsjTitle = document.querySelector(TOAST_ID_TITULO);

        toastMsjBody.innerHTML = mensaje
        toastMsjTitle.innerHTML = titulo;

        const classes = ['toast', 'mt-2']

        classes.push(className);

        toast.className = classes.join(' ');

        $(TOAST_ID).toast('show');
    }

    const compilaTemplate = (idTemplate, data, idContenedor) => {
        const compilacion = Handlebars.compile(document.getElementById(idTemplate).innerHTML);
        const compConData = compilacion(data);
        document.querySelector(idContenedor).innerHTML = compConData;
    }

    const getMainForm = () => document.getElementById(ID_MAIN_FORM);

    const getFormElements = () => getMainForm().elements;

    const getFormEleValue = (ele) => getFormElements()[ele].value;

    const setFormEleValue = (ele, value) => { getFormElements()[ele].value = value; }

    const getEntidad = (arrCampos = [], conId = true, conAccion = true) => {

        const formElements = getFormElements();

        let entidad = {};

        arrCampos.forEach(fil => {
            entidad = {
                ...entidad,
                [fil]: formElements[fil].value
            }
        });

        if (conId) entidad.Id = formElements['Id'].value;

        if (conAccion) entidad.accion = formElements['accion'].value;

        return entidad;
    }

    const setEntidad = (entidad = {}) => {
        const formElements = getFormElements();
        Object.keys(entidad).forEach(key => {
            formElements[key].value = entidad[key];
        })
    }

    const limpiarMainForm = (resetId = 0, resetAccion = 'registrar') => {
        getMainForm().reset();
        setFormEleValue('Id', resetId);
        setFormEleValue('accion', resetAccion);
    }

    const cerrarModalMainform = () => {
        $('#modal-main-form').modal('hide');
    }

    window.AthenasNet = {
        llamadaApi,
        manejaSpinner,
        muestraToast,
        compilaTemplate,
        getEntidad,
        getFormEleValue,
        setFormEleValue,
        limpiarMainForm,
        cerrarModalMainform,
        setEntidad
    };
})()


window.addEventListener('load', () => {
    $.extend(true, $.fn.dataTable.defaults, {
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "language": {
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "paginate": {
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
    $('#general-toast').toast();
})

