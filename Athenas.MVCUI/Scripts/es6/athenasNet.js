(function () {

    const MVC_URL_BASE = 'http://localhost:62622/';
    const ACCION_MOSTRAR_SPINNER = 'mostrar';
    const ACCION_OCULTAR_SPINNER = 'ocultar';

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

    window.AthenasNet = {
        llamadaApi,
        manejaSpinner,
        muestraToast,
        compilaTemplate
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

