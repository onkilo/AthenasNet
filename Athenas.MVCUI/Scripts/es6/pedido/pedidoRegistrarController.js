const PedidoController = (service, ui, proveedorService, productoService) => {
    let lstProductos = [];
    let lstProveedores = [];
    let tipoBusqueda = null;//Producto, Proveedor

    const muestraProductos = async () => {
        lstProductos = await productoService.listar({});
        console.log(lstProductos)
    }

    const muestraProveedores = async () => {
        lstProveedores = await proveedorService.listarProveedor({});
        console.log(lstProveedores)
    }

    const evtBtnBuscarProducto = () => ui.getBtnBuscarProducto().addEventListener('click', () => tipoBusqueda = 'Producto');

    const evtBtnBuscarProveedor = () => ui.getBtnBuscarProveedor().addEventListener('click', () => tipoBusqueda = 'Proveedor');

    const evtAbreModal = () => {
        ui.getModalBuscar().on('show.bs.modal', (e) => {
            if (tipoBusqueda === 'Producto') muestraProductos();
            else muestraProveedores();
        })
    }

    const iniciar = () => {
        evtBtnBuscarProducto();
        evtBtnBuscarProveedor();
        evtAbreModal();
    }

    return {
        iniciar
    }
}