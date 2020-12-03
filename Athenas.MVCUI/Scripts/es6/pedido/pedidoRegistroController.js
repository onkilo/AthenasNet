const PedidoController = (service, ui, proveedorService, productoService) => {

    const tipoBusqueda = null;

    const evtMostrarModalBuscar = () => {

        ui.getModalBuscar().on('show.bs.modal', (e) => {

            if (tipoBusqueda === 'Proveedor') muestraProveedores();
            else muestraProductos();

        })

    }

    const evtBtnBuscarProducto = () => {
        ui.getBtnBuscarProducto().addEventListener('click', () => tipoBusqueda = 'Producto' )
    }
    const evtBtnBuscarProveedor = () => {
        ui.getBtnBuscarProveedor().addEventListener('click', () => tipoBusqueda = 'Proveedor' )
    }

    const muestraProductos = () => {

    }

    const muestraProveedores = () => {

    } 

    const iniciar = () => {
        evtMostrarModalBuscar();
    }


    return {
        iniciar
    }
}