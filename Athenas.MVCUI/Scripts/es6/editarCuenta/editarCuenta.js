window.addEventListener('load', () => {

    const service = UsuarioService();

    const ui = EditarCuentaUI();

    const controller = EditarCuentaController(service, ui);

    controller.iniciar();

})