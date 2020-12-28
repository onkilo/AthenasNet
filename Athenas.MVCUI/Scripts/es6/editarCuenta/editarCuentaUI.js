const EditarCuentaUI = () => {


    const getFormEditarUsuario = () => document.getElementById('form-editar-cuenta');

    const getCuenta = () => {

        const arrEle = [
            'Nombre',
            'Apellido',
            'Telefono',
            'Direccion',
            'Email',
            'Usuario',
            'Contrasenia',
            'Dni',
            'Sexo'
        ]

        const elementosFormulario = getFormEditarUsuario().elements;

        let entidad = {};
        arrEle.forEach(ele => {
            entidad = {
                ...entidad,
                [ele]: elementosFormulario[ele].value
            }
        })


        return entidad;
    }

    return {
        getFormEditarUsuario,
        getCuenta
    }
}