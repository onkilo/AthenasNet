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

    window.AthenasNet = {
        llamadaApi,
        manejaSpinner
    };
})()


window.addEventListener('load', () => {

    $('#general-toast').toast();
})

