const UsuarioUI = () => {

    const ID_FORM_CUENTA = 'form-usuario';


    const getFormCuenta = () => document.getElementById(ID_FORM_CUENTA);


    const setFormCuenta = (entidad, arrExcepciones = []) => {


        const elementos = getFormCuenta().elements;

        elementos.forEach(ele => {
            if (arrExcepciones.includes(ele)) return;
            ele.value = entidad[ële]
        })

    }


    const getCuenta = () => {
        const elementosFormulario = getFormCuenta().elements;

        const arrEle = [
            'Nombre',
            'Apellido',
            'Dni',
            'Sexo',
            'Direccion',
            'Email',
            'Usuario',
            'Contrasenia',
            'Telefono'
        ]

        let cuenta = {};

        arrEle.forEach(ele => {
           cuenta = {
                ...cuenta,
                [ele]: elementosFormulario[ele].value
            }
        })


        return cuenta;
    }

    return {
        getFormCuenta,
        setFormCuenta,
        getCuenta
    }

}