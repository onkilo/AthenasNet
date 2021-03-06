
const PedidoUI = () => {
    //Para el listado
    const getFiltros = () => {
        const arrFiltros = ['Proveedor'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstPedidos) => {

        const data = {
            filas: lstPedidos,
            elimina: true,
            recibe: true,
            iniCodigo: 'PED',
            urlRecibir: AthenasNet.MVC_URL_BASE + 'Pedido/Recibir'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    //Para recibir el pedido

    const getBtnPostRecibir = () => document.getElementById('btn-pedido-recibir');


    //Para el registro

    const setProveedor = (proveedor) => {

        const inRzSocial = document.getElementById('Proveedor.RzSocial');
        const inDireccion = document.getElementById('Proveedor.Direccion');
        const inTelefono = document.getElementById('Proveedor.Telefono');

        inRzSocial.value = proveedor.RzSocial;
        inDireccion.value = proveedor.Direccion;
        inTelefono.value = proveedor.Telefono;
    }

    const setProducto = (producto) => {

        const inCodigo = document.getElementById('Producto.Codigo');
        const inDescripcion = document.getElementById('Producto.Descripcion');
        const inPrecio = document.getElementById('Producto.PrecioCompra');
        const inStock = document.getElementById('Producto.StockActual');

        inCodigo.value = producto.Codigo;
        inDescripcion.value = producto.Descripcion;
        inPrecio.value = producto.PrecioCompra;
        inStock.value = producto.StockActual;

    }

    const getBtnBuscarProveedor = () => document.getElementById('btn-buscar-proveedor');

    const getBtnBuscarProducto = () => document.getElementById('btn-buscar-producto');

    const getBtnAgregarDet = () => document.getElementById('btn-agregar-detalle');

    const getInputCantidad = () => document.getElementById('Producto.Cantidad');

    const getFormPedido = () => document.getElementById('form-pedido');

    const setTotal = (total) => document.getElementById('txt-total').value = total;

    const getModalBuscar = () => $('#modalBuscar');

    const getModalContentBuscar = () => document.querySelector('#modalBuscar .modal-content');

    const getTblModalBuscar = () => document.getElementById('tbl-modal-buscar');

    const getTblDetalle = () => document.getElementById('tb-detalle');

    const setModalBuscarData = (data) => {
        AthenasNet.compilaTemplate('tempModalBuscar', data, '#modalBuscar .modal-content')
    }

    const setDetalleData = (data) => {
        AthenasNet.compilaTemplate('tempDetalle', data, '#tb-detalle #det-body')
    }

    const abreModalPedido = () => {
        $('#modalDetPedido').modal('show');
    }

    const setModalPedidoData = (pedido) => {
        AthenasNet.compilaTemplate('tempModalPedidoBody', pedido, '#modalDetPedido .modal-body')
    }

    const setModalPedidoDetData = (pedido) => {
        AthenasNet.compilaTemplate('tempDetPedidoTbl', pedido, '#modalDetPedido .modal-body #det-body')
    }

    const validaEnvioPedido = (esValido) => {
        if (!esValido) {
            getFormPedido().classList.add('was-validated')
        }
        else {
            getFormPedido().classList.remove('was-validated')
        }
    }

    const validaProvSeleccionado = (esValido) => {

        if (!esValido) {
            document.getElementById('Proveedor.RzSocial').classList.add('is-invalid')
        }
        else { 
            document.getElementById('Proveedor.RzSocial').classList.remove('is-invalid')
        }

    }

    const validaProdSeleccionado = (esValido) => {
        debugger
        if (!esValido) {
            document.getElementById('Producto.Codigo').classList.add('is-invalid')
        }
        else {
            document.getElementById('Producto.Codigo').classList.remove('is-invalid')
        }

    }

    const validaCantidadDetalle = (esValido) => {

        if (!esValido) {
            document.getElementById('Producto.Cantidad').classList.add('is-invalid');
        }
        else {
            document.getElementById('Producto.Cantidad').classList.remove('is-invalid');
        }

    }

    const validaDetalle = (esValido) => {
        
        if (!esValido) {
            document.getElementById('msj-error').classList.remove('d-none');
        }
        else {
            document.getElementById('msj-error').classList.add('d-none');
        }

    }

    return {
        generarTabla,
        getFiltros,
        getBtnPostRecibir,
        setProveedor,
        setProducto,
        getBtnBuscarProveedor,
        getBtnBuscarProducto,
        getModalBuscar,
        setModalBuscarData,
        setDetalleData,
        getBtnAgregarDet,
        getTblModalBuscar,
        getModalContentBuscar,
        getInputCantidad,
        setTotal,
        getTblDetalle,
        getFormPedido,
        abreModalPedido,
        setModalPedidoData,
        validaEnvioPedido,
        validaProvSeleccionado,
        validaProdSeleccionado,
        validaCantidadDetalle,
        validaDetalle
    }

}

window.addEventListener('load', () => {

    const tempDetPedidoTbl = document.getElementById('tempDetPedidoTbl');

    if (tempDetPedidoTbl) {
        Handlebars.registerPartial('tblDetPedido', tempDetPedidoTbl.innerHTML);
    }
    

})