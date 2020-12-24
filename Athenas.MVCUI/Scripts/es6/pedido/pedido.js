window.addEventListener('load', async () => {
    const service = PedidoService();

    const ui = PedidoUI();

    let proveedorService = null, productoService = null;

    if (window.ProveedorService) {
        proveedorService = ProveedorService();
    }

    if (window.ProductoService) {
        productoService = ProductoService();
    }

    let controller = null

    //if (window.conValidacionRoles) {
    //    controller = await conValidacionRoles(PedidoController, [ui, proveedorService, productoService])
    //}
    //else {
    //    controller = PedidoController(service, ui, proveedorService, productoService);
    //}

    controller = (window.conValidacionRoles)
        ? await conValidacionRoles(PedidoController, [service, ui, proveedorService, productoService])
        : await PedidoController(service, ui, proveedorService, productoService);
    debugger
    controller.iniciar();

})