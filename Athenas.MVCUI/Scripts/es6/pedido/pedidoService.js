
const PedidoService = () => {

    const crear = async (pedido) => {
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(pedido),
            url: 'Pedido/Crear'
        })

        return respuesta;
    }

    const actualizar = async (pedido) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(pedido),
            url: 'Pedido/Actualizar'
        })

        return respuesta;
    }

    const listar = async (filtros) => {

        const filtrosDefecto = {
            Descripcion: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Pedido/Listar'
        })

        return respuesta.Data;
    }

    const eliminar = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Pedido/Eliminar'
        })
        return respuesta
    }

    const buscar = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Pedido/Obtener'
        })
        return respuesta;

    }

    return {
        crear,
        actualizar,
        listar,
        eliminar,
        buscar
    }
}