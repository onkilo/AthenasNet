window.addEventListener('load', () => {

    const service = UsuarioService();

    const ui = UsuarioUI();

    const controller = UsuarioController(service, ui);

    controller.iniciar();

})