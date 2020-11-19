window.addEventListener('load', () => {

    const service = ClienteService();

    const ui = ClienteUI();

    const controller = ClienteController(service, ui);

    controller.iniciar();

})