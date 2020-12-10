window.addEventListener('load', () => {
    const service = VentaService();

    const ui = VentaUI();
    let clienteService = null, productoService = null;

    if (window.ClienteService) {
        clienteService = ClienteService();
    }

    if (window.ProductoService) {
        productoService = ProductoService();
    }

    const controller = VentaController(service, ui, clienteService, productoService);

    controller.iniciar();

})