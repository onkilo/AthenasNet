window.addEventListener('load', () => {

    const service = ProveedorService();

    const ui = ProveedorUI();

    const controller = ProveedorController(service, ui);

    controller.iniciar();

})