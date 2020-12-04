window.addEventListener('load', () => {

    const service = PedidoService();

    const ui = PedidoUI();

    let productoService = null, proveedorService = null;

    if (window.ProductoService) {
        productoService = ProductoService();
    }

    if (window.ProveedorService) {
        proveedorService = ProveedorService();
    }

    const controller = PedidoController(service, ui, proveedorService, productoService);

    controller.iniciar();

})