
const PromocionService = () => {

    const crear = async (promocion) => {
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(promocion),
            url: 'Promocion/Crear'
        })

        return respuesta;
    }

    const actualizar = async (promocion) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(promocion),
            url: 'Promocion/Actualizar'
        })

        return respuesta;
    }

    const listar = async (filtros) => {

        const filtrosDefecto = {
            Producto: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Promocion/Listar'
        })

        return respuesta.Data;
    }

    const eliminar = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Promocion/Eliminar'
        })
        return respuesta
    }

    const buscar = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Promocion/Obtener'
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