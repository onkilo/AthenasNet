
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

    const getModalBuscar = () => $('#modalBuscar');

    const setModalBuscarData = (data) => {
        AthenasNet.compilaTemplate('tempModalBuscar', data, '#modalBuscar .modal-content')
    }

    const setDetalleData = (data) => {
        AthenasNet.compilaTemplate('tempDetalle', data, '#tb-detalle #det-body')
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
        getBtnAgregarDet
    }
}