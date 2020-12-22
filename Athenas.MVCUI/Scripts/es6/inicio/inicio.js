window.addEventListener('load', () => {

    const usuarioService = UsuarioService();

    const ui = InicioUI();

    const controller = InicioController(usuarioService, ui);

    controller.iniciar();

})