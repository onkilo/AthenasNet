const VentaUI = () => {
    //Para el listado
    const getFiltros = () => {
        const arrFiltros = ['Cliente'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstVentas) => {
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();
        const data = {
            filas: lstVentas,
            elimina: true,
            iniCodigo: 'VEN'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

 
    //Para el registro

    const setCliente = (cliente) => {

        const inNombre = document.getElementById('Cliente.Nombre');
        const inDni = document.getElementById('Cliente.Dni');
        const inTelefono = document.getElementById('Cliente.Telefono');

        inNombre.value = cliente.Nombre;
        inDni.value = cliente.Dni;
        inTelefono.value = cliente.Telefono;
    }

    const setProducto = (producto) => {

        const inCodigo = document.getElementById('Producto.Codigo');
        const inDescripcion = document.getElementById('Producto.Descripcion');
        const inPrecio = document.getElementById('Producto.PrecioVenta');
        const inStock = document.getElementById('Producto.StockActual');
        const inDesc = document.getElementById('Producto.Descuento');

        inCodigo.value = producto.Codigo;
        inDescripcion.value = producto.Descripcion;
        inPrecio.value = producto.PrecioVenta;
        inStock.value = producto.StockActual;
        inDesc.value = producto.Descuento;

    }

    const getBtnBuscarCliente = () => document.getElementById('btn-buscar-cliente');

    const getBtnBuscarProducto = () => document.getElementById('btn-buscar-producto');

    const getBtnAgregarDet = () => document.getElementById('btn-agregar-detalle');

    const getInputCantidad = () => document.getElementById('Producto.Cantidad');

    const getFormVenta = () => document.getElementById('form-venta');

    const setSubTotal = (subtotal) => document.getElementById('txt-subtotal').value = subtotal;

    const setDescuento = (descuento) => document.getElementById('txt-descuento').value = descuento;

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

    const abreModalVenta = () => {
        $('#modalDetVenta').modal('show');
    }

    const setModalVentaData = (venta) => {
        AthenasNet.compilaTemplate('tempModalVentaBody', venta, '#modalDetVenta .modal-body')
    }

    const setModalVentaDetData = (venta) => {
        AthenasNet.compilaTemplate('tempDetVentaTbl', venta, '#modalDetVenta .modal-body #det-body')
    }

    const validaEnvioVenta = (esValido) => {
        if (!esValido) {
            getFormVenta().classList.add('was-validated')
        }
        else {
            getFormVenta().classList.remove('was-validated')
        }
    }

    const validaCliSeleccionado = (esValido) => {

        if (!esValido) {
            document.getElementById('Cliente.Nombre').classList.add('is-invalid')
        }
        else {
            document.getElementById('Cliente.Nombre').classList.remove('is-invalid')
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
        setCliente,
        setProducto,
        getBtnBuscarCliente,
        getBtnBuscarProducto,
        getModalBuscar,
        setModalBuscarData,
        setDetalleData,
        getBtnAgregarDet,
        getTblModalBuscar,
        getModalContentBuscar,
        getInputCantidad,
        setSubTotal,
        setDescuento,
        setTotal,
        getTblDetalle,
        getFormVenta,
        abreModalVenta,
        setModalVentaData,
        validaEnvioVenta,
        validaCliSeleccionado,
        validaProdSeleccionado,
        validaCantidadDetalle,
        validaDetalle
    }
}

window.addEventListener('load', () => {

    const tempDetVentaTbl = document.getElementById('tempDetVentaTbl');

    if (tempDetVentaTbl) {

        Handlebars.registerPartial('tblDetVenta', tempDetVentaTbl.innerHTML);
    }
    

})