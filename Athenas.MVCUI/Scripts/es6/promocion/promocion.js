window.addEventListener('load', () => {
    const service = PromocionService();

    const ui = PromocionUI();

    const productoService = ProductoService();

    const controller = ProductoController(service, ui, productoService);

    controller.iniciar();

})