(function () {

    const MVC_URL_BASE = 'http://localhost:62622/';
    const ACCION_MOSTRAR_SPINNER = 'mostrar';
    const ACCION_OCULTAR_SPINNER = 'ocultar';
    const SEL_MODAL_CONF = '#modal-confirmar';
    const ID_FORM_CONFIRMAR = 'form-confirmar';
    const ID_TEMP_TBL_BODY = 'temp-tbl-body';

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

    const muestraToast = ({ cssClass = 'bg-success', mensaje = 'Operación exitosa', titulo = 'Éxito' }) => {

        const SEL_TOAST = '#general-toast';
        const SEL_TOAST_TITULO = '#general-toast #toast-titulo';
        const SEL_TOAST_MENSAJE = '#general-toast #toast-mensaje';

        const toast = document.querySelector(SEL_TOAST);

        const clases = ['toast', 'mt-2'];
        clases.push(cssClass);

        toast.className = clases.join(' ');

        document.querySelector(SEL_TOAST_TITULO).innerHTML = titulo;
        document.querySelector(SEL_TOAST_MENSAJE).innerHTML = mensaje;

        $(SEL_TOAST).toast('show');

    }

    const compilaTemplate = (idTemplate, data, selObjetivo) => {

        const htmlTemplate = document.getElementById(idTemplate).innerHTML;

        const template = Handlebars.compile(htmlTemplate);

        const compTemplate = template(data);

        document.querySelector(selObjetivo).innerHTML = compTemplate;
    }

    const getFormConfirmar = () => document.getElementById(ID_FORM_CONFIRMAR);

    const mostrarConfirmacion = () => {
        $(SEL_MODAL_CONF).modal('show');
    }

    const ocultarConfirmacion = () => {
        $(SEL_MODAL_CONF).modal('hide');
    }

    const formatFecha = (fecha) => {

        const arrElementos = fecha.split('-');
        const newFecha = arrElementos.reverse().join('/');
        return newFecha;
    }

    const formatPrecio = (precio) => {
        return `S/. ${precio.toFixed(2)}`;
    }


    window.AthenasNet = {
        llamadaApi,
        manejaSpinner,
        muestraToast,
        compilaTemplate,
        getFormConfirmar,
        mostrarConfirmacion,
        ocultarConfirmacion,
        ID_TEMP_TBL_BODY,
        formatFecha,
        formatPrecio
    };
})()

//Handlebars helpers personalizados
//Determina si la propiedad de un objeto es un Id
Handlebars.registerHelper('isId', (key) => {
    return key === 'Id' || key === 'id';
});

//Formatea el código de los diferentes mantenedores
Handlebars.registerHelper('formatoCodigo', (id, iniFormato, cantNum) => {
    let formato = iniFormato;
    debugger
    const cantCeros = cantNum - id.toString().length;

    for (let i = 0; i < cantCeros; i++) {
        formato += '0';
    }

    formato += id.toString();

    return formato;
});

//Da formato de precio a un número
Handlebars.registerHelper('formatoPrecio', ( precio) => {
    return `S/. ${precio.toFixed(2)}`;
})


//Fin de los helpers

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

