const crearCategoria = async (categoria) => {
    try {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(categoria),
            url: 'Categoria/Crear'
        })
        //activar el toast
        console.log(respuesta);
    }
    catch (err) {
        console.error(err);
    }
}

const actualizarCategoria = async (categoria) => {
    try {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(categoria),
            url: 'Categoria/Actualizar'
        })
        //activar el toast
        console.log(respuesta);
    }
    catch (err) {
        console.error(err);
    }
}

const listarCategoria = async (filtros) => {
    try {

        const filtrosDefecto = {
            Descripcion: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Categoria/Listar'
        })
        //activar el toast
        console.log(respuesta);
    }
    catch (err) {
        console.error(err);
    }
}

const buscarCategoria = async (id) => {
    try {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Obtener'
        })
        //activar el toast
        console.log(respuesta);
        $('#modal-categoria').modal('hide');
        //Limpiar campos
    }
    catch (err) {
        //mensaje de error en el toast
        console.error(err);
    }
}

const eliminarCategoria = async (id) => {
    try {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Eliminar'
        })
        //activar el toast
        console.log(respuesta);
    }
    catch (err) {
        console.error(err);
    }
}



window.addEventListener('load', () => {

    document.querySelector('#form-categoria').addEventListener('submit', (evt) => {
        evt.preventDefault();

        const formCategoria = document.getElementById('form-categoria');

        const formElementos = formCategoria.elements;

        const categoria = {
            Descripcion: formElementos['txt-descripcion'].value,
            Id: parseInt(formElementos('hdn-id').value),
        };

        buscarCategoria(3005)
    })


})