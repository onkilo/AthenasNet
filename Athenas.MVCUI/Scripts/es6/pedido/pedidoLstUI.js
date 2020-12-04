
const PedidoUI = () => {
    //para el listado
    const getFiltros = () => {
        const arrFiltros = ['Proveedor'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstPedido) => {
        const data = {
            filas: lstPedido,
            edita: false,
            recibe: true,
            elimina: true,
            iniCodigo: 'PED',
            recibirUrl: `${window.location.protocol}//${window.location.host}${window.location.pathname}/Recibir`
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    //para el registro

    const getTblModalBuscar = () => document.getElementById('tbl-modal-buscar');

    const getModalBuscar = () => $('#modalBuscar');

    const getBtnBuscarProducto = () => document.getElementById('btn-buscar-producto');

    const getBtnBuscarProveedor = () => document.getElementById('btn-buscar-proveedor');

    const getBtnAgregarDet = () => document.getElementById('btn-agregar-detalle');

    const getFormPedido = () => document.getElementById('form-pedido');


    const setProducto = (producto) => {
        //const Id = document.getElementById('Producto.Id');
        const Codigo = document.getElementById('Producto.Codigo');
        const Descripcion = document.getElementById('Producto.Descripcion');
        const PrecioCompra = document.getElementById('Producto.PrecioCompra');
        const StockActual = document.getElementById('Producto.StockActual');

        Codigo.value = producto.Codigo;
        Descripcion.value = producto.Descripcion;
        PrecioCompra.value = producto.PrecioCompra;
        StockActual.value = producto.StockActual;

    }

    const setProveedor = (proveedor) => {
        const Id = document.getElementById('Proveedor.Id');
        const RzSocial = document.getElementById('Proveedor.RzSocial');
        const Direccion = document.getElementById('Proveedor.Direccion');
        const Telefono = document.getElementById('Proveedor.Telefono');

        Id.value = proveedor.Id;
        RzSocial.value = proveedor.RzSocial;
        Direccion.value = proveedor.Direccion;
        Telefono.value = proveedor.Telefono;

    }

    const setModalBuscarData = (lstData) => {
        AthenasNet.compilaTemplate('tempModalBuscar', lstData, '#modalBuscar .modal-content')
    }

    const setDetallesData = (lstData) => {
        AthenasNet.compilaTemplate('tempDetalle', lstData, '#tb-detalle #det-body')
    }

    return {
        generarTabla,
        getFiltros,
        getTblModalBuscar,
        getModalBuscar,
        setProducto,
        setProveedor,
        getBtnBuscarProducto,
        getBtnBuscarProveedor,
        setModalBuscarData,
        getBtnAgregarDet,
        setDetallesData,
        getFormPedido
    }
}