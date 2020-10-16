let categorias = [];

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

    const buscarCategoria = async (id) => {
   
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Obtener'
        })

        return respuesta.Data;
    }

    const eliminarCategoria = async (id) => {

        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Eliminar'
        })
        return respuesta;
    }

    return {
        crearCategoria,
        actualizarCategoria,
        listarCategoria,
        buscarCategoria,
        eliminarCategoria
    }
}

const CategoriaUI = () => {

    const IDFORMCATEGORIA = 'form-categoria';
    const IDFORMCONFIRMACION = 'form-confirmar';
    const TBLBODYSELECTOR = '#tb-categoria tbody';
    const BTNNUEVOSELECTOR = '#btn-nuevo';
    const TBLCATESELECTOR = '#tb-categoria';
    const MODALCATEGORIA = $('#modal-categoria');

    const formCategoria = () => document.getElementById(IDFORMCATEGORIA);

    const formConfirmacion = () => document.getElementById(IDFORMCONFIRMACION);

    const formCategoriaElements = () => formCategoria().elements;

    const getFormElement = (ele) => formCategoriaElements()[ele].value;

    const setFormElement = (ele, value) => formCategoriaElements()[ele].value = value;

    const getTablaCate = () => document.querySelector(TBLCATESELECTOR);

    const getBtnNuevo = () => document.querySelector(BTNNUEVOSELECTOR);

    const generarFila = (categoria) => {
        let template = `
            <tr>
                <td>${categoria.Id}</td>
                <td>${categoria.Descripcion}</td>
                <td>
                    <button type="button" class="btn btn-success btn-sm btn-sin-click" data-id="${categoria.Id}" data-accion="editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="btn btn-success btn-sm btn-sin-click" data-id="${categoria.Id}" data-accion="eliminar">
                        <i class="fas fa-trash-alt" data-del-action="true"></i>
                    </button>
                </td>
            </tr>
        `;

        return template;
    }

    const generarTabla = (categorias) => {
        const tBody = document.querySelector(TBLBODYSELECTOR);

        let tableBody = "";

        lstCategorias.forEach((cat) => {
            tableBody += generarFila(cat);
        });

        tBody.innerHTML = tableBody;
    }

    const getCategoria = () => {
        const categoria = {
            Descripcion: getFormElement('txt-descripcion'),
            Id: getFormElement('hdn-id'),
            accion: getFormElement('accion'),
        }

        return categoria;
    }

    const limpiaFormulario = () => {
        setFormElement('txt-descripcion', '');
        setFormElement('hdn-id', 0);
        setFormElement('accion', 'registrar');
    }

    const escondeModal = () => {
        MODALCATEGORIA.modal('hide');
    }

    const muestraModal = (categoria) => {
        if (categoria) {
            setFormElement('txt-descripcion', categoria.Descripcion);
            setFormElement('hdn-id', categoria.Id);
            setFormElement('accion', 'editar');
        }
        else {
            limpiaFormulario();
        }

        MODALCATEGORIA.modal('show');
    }


    return {
        formCategoria,
        generarTabla,
        getCategoria,
        limpiaFormulario,
        formConfirmacion,
        getTablaCate
    }
}

const CategoriaController = (service, ui) => {
    let categoriaSeleccionada = {};
    let lstCategoria = [];

    const mostrarCategorias = async () => {
        try {
            lstCategorias = await service.listarCategoria({});

            ui.generarTabla(lstCategoria);
        }
        catch (err) {
            console.error(err);
        }
    }

    const manejaSubmitCate = () => {
        ui.formCategoria.addEventListener('submit', async (evt) => {
            evt.preventDefault();
            categoriaSeleccionada = ui.getCategoria();
            try {
                if (categoriaSeleccionada.accion === 'registrar') {
                    categoriaSeleccionada.Id = 0;
                    await service.crearCategoria(categoriaSeleccionada);
                }
                else if (categoriaSeleccionada.accion === 'editar') {
                    await service.actualizarCategoria(categoriaSeleccionada);
                    
                }
                ui.escondeModal();
                ui.limpiaFormulario();
            }
            catch (err) {
                console.error(err);
            }
        });
    }

    const manejaSubmitConf = () => {
        ui.formConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();
            await service.eliminarCategoria(categoriaSeleccionada.Id);
            
            await mostrarCategorias();
        }) 
    }

    const manejaClickTabla = () => {
        
    }

    const init = () => {
        mostrarCategorias();
        manejaSubmitCate();
        manejaSubmitConf();
    }

    return { init };

}
const crearCategoria = async (categoria) => {
    try {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(categoria),
            url: 'Categoria/Crear'
        })
        //activar el toast
        console.log(respuesta);
    }
    catch (err) {
        console.error(err);
    }
}

const actualizarCategoria = async (categoria) => {
    try {

        const respuesta = await AthenasNet.llamadaApi({
            type: 'POST',
            data: JSON.stringify(categoria),
            url: 'Categoria/Actualizar'
        })
        //activar el toast
        console.log(respuesta);
    }
    catch (err) {
        console.error(err);
    }
}

const generarTempCategoria = (categoria) => {
    let template = `
    <tr>
        <td>${categoria.Id}</td>
        <td>${categoria.Descripcion}</td>
        <td>
            <button type="button" class="btn btn-success btn-sm btn-sin-click" data-id="${categoria.Id}" data-accion="editar">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-success btn-sm btn-sin-click" data-id="${categoria.Id}" data-accion="eliminar">
                <i class="fas fa-trash-alt" data-del-action="true"></i>
            </button>
        </td>
    </tr>
`;

    return template;
}


const generarTabla = (lstCategorias) => {
    const tBody = document.querySelector('#tb-categoria tbody');

    let tableBody = "";

    lstCategorias.forEach((cat) => {
        tableBody += generarTempCategoria(cat);
    });

    tBody.innerHTML = tableBody;
}

const listarCategoria = async (filtros) => {
    try {

        const filtrosDefecto = {
            Descripcion: '',
            ...filtros
        }

        const respuesta = await AthenasNet.llamadaApi({
            data: filtrosDefecto,
            url: 'Categoria/Listar'
        })
        //activar el toast
        console.log(respuesta);
        categorias = respuesta.Data;
        generarTabla(categorias);
    }
    catch (err) {
        console.error(err);
    }
}

const buscarCategoria = async (id) => {
    try {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Obtener'
        })
        //activar el toast
        console.log(respuesta);
        $('#modal-categoria').modal('hide');
        //Limpiar campos
    }
    catch (err) {
        //mensaje de error en el toast
        console.error(err);
    }
}

const eliminarCategoria = async (id) => {
    try {
        const respuesta = await AthenasNet.llamadaApi({
            data: { Id: id },
            url: 'Categoria/Eliminar'
        })
        //activar el toast
        console.log(respuesta);
    }
    catch (err) {
        console.error(err);
    }
}



window.addEventListener('load', () => {

    listarCategoria({});

    const tablaCategoria = document.querySelector('#tb-categoria');
    const btnNuevo = document.querySelector('#btn-nuevo');
    const formCategoria = document.getElementById('form-categoria');
    const formConfirmar = document.getElementById('form-confirmar');
    const formElementos = formCategoria.elements;

    btnNuevo.addEventListener('click', () => { formElementos['accion'].value = 'registrar'; });

    $('#modal-categoria').on('show.bs.modal', (e) => {
        if (formElementos['accion'].value === 'registrar') {
            formElementos['descripcion'].value = '';
            formElementos['hdn-id'].value = 0;
        }
    } )

    tablaCategoria.addEventListener('click', (evt) => {

        if (evt.target.dataset.id) {
            const { id, accion } = evt.target.dataset;
            if (accion === 'editar') {
                console.log(formElementos)

                const cateSeleccionada = categorias.find(c => c.Id === parseInt(id));

                formElementos['descripcion'].value = cateSeleccionada.Descripcion;
                formElementos['hdn-id'].value = cateSeleccionada.Id;
                formElementos['accion'].value = 'editar';
                $('#modal-categoria').modal('show');
            }
            else if (accion === 'eliminar') {
                console.log('eliminar')
                $('#modal-confirmar').modal('show');
            }
        }

        
    });

    formCategoria.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const accion = formElementos['accion'].value;

        const categoria = {
            Descripcion: formElementos['txt-descripcion'].value,
            Id: parseInt(formElementos['hdn-id'].value),
        };

        if (accion === 'registrar') {
            await crearCategoria(categoria);
        }
        else if (accion === 'editar') {
            await actualizarCategoria(categoria);
            
        }
       
        $('#modal-categoria').modal('hide');
        await listarCategoria({});
    })


})