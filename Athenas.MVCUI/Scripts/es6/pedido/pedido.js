window.addEventListener('load', () => {
    const service = PedidoService();

    const ui = PedidoUI();

    let proveedorService = null, productoService = null;

    if (window.ProveedorService) {
        proveedorService = ProveedorService();
    }

    if (window.ProductoService) {
        productoService = ProductoService();
    }

    const controller = PedidoController(service, ui, proveedorService, productoService);

    controller.iniciar();

})