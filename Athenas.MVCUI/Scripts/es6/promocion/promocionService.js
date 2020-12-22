
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

    const tienePromociones = async (producto, fechaInicio, fechaFin, promocion) => {

        const urlParametros = {
            Producto: producto,
            FechaInicio: fechaInicio,
            FechaFin: fechaFin,
            Promocion: promocion
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: urlParametros,
            url: 'Promocion/TienePromociones'
        })

        return respuesta.Data;
    }

    return {
        crear,
        actualizar,
        listar,
        eliminar,
        buscar,
        tienePromociones
    }
}