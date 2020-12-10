window.addEventListener('load', () => {

    const ui = InicioUI();

    const usuarioService = UsuarioService();

    const controller = InicioController(ui, usuarioService);

    controller.iniciar();

})