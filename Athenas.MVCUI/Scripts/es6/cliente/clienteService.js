
const ClienteService = () => {

    const crearCliente = async (cliente) => {
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(cliente),
            url: 'Cliente/Crear'
        })

        return respuesta;
    }

    const actualizarCliente = async (cliente) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(cliente),
            url: 'Cliente/Actualizar'
        })

        return respuesta;
    }

    const listarCliente = async (filtros) => {

        const filtrosDefecto = {
            Nombre: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Cliente/Listar'
        })

        return respuesta.Data;
    }

    const eliminarCliente = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Cliente/Eliminar'
        })
        return respuesta
    }

    const buscarCliente = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Cliente/Obtener'
        })
        return respuesta;

    }

    return {
        crearCliente,
        actualizarCliente,
        listarCliente,
        eliminarCliente,
        buscarCliente
    }
}