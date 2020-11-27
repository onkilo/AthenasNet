window.addEventListener('load', () => {
    const service = PromocionService();

    const ui = ProductoUI();

    const productoService = ProductoService();

    const controller = ProductoController(service, ui, productoService);

    controller.iniciar();

})