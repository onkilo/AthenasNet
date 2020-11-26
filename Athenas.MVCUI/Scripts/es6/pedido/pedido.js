window.addEventListener('load', () => {

    const service = PedidoService();

    const ui = PedidoUI();

    const controller = PedidoController(service, ui);

    controller.iniciar();

})