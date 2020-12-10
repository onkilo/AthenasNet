
const VentaService = () => {

    const crear = async (venta) => {
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(venta),
            url: 'Venta/Crear'
        })

        return respuesta;
    }

    const actualizar = async (venta) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(venta),
            url: 'Venta/Actualizar'
        })

        return respuesta;
    }

    const listar = async (filtros) => {

        const filtrosDefecto = {
            Cliente: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Venta/Listar'
        })

        return respuesta.Data;
    }

    const eliminar = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Venta/Eliminar'
        })
        return respuesta
    }

    const buscar = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Venta/Obtener'
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