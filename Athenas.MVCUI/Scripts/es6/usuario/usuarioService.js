
const UsuarioService = () => {

    const crear = async (usuario) => {
        debugger
        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(usuario),
            url: 'Usuario/Crear'
        })

        return respuesta;
    }

    const actualizar = async (usuario) => {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(usuario),
            url: 'Usuario/Actualizar'
        })

        return respuesta;
    }

    const listar = async (filtros) => {

        const filtrosDefecto = {
            Nombre: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Usuario/Listar'
        })

        return respuesta.Data;
    }

    const eliminar = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Usuario/Eliminar'
        })
        return respuesta
    }

    const buscar = async (id) => {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Usuario/Obtener'
        })
        return respuesta;
    }

    const roles = async () => {
        const respuesta = await AthenasNet.llamadaApi({
            data: {},
            url: 'Usuario/Roles'
        })

        return respuesta.Data;
    }

    return {
        crear,
        actualizar,
        listar,
        eliminar,
        buscar,
        roles
    }
}