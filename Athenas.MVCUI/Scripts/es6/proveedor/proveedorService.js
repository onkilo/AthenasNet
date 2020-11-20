
const ProveedorService = () => {

    const crearProveedor = async (proveedor) => {
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(proveedor),
            url: 'Proveedor/Crear'
        })

        return respuesta;
    }

    const actualizarProveedor = async (proveedor) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(proveedor),
            url: 'Proveedor/Actualizar'
        })

        return respuesta;
    }

    const listarProveedor = async (filtros) => {

        const filtrosDefecto = {
            RzSocial: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Proveedor/Listar'
        })

        return respuesta.Data;
    }

    const eliminarProveedor = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Proveedor/Eliminar'
        })
        return respuesta
    }

    const buscarProveedor = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Proveedor/Obtener'
        })
        return respuesta;

    }

    return {
        crearProveedor,
        actualizarProveedor,
        listarProveedor,
        eliminarProveedor,
        buscarProveedor
    }
}