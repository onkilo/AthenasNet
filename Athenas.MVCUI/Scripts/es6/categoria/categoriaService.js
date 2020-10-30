
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