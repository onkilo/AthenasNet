window.addEventListener('load', () => {

    const service = CategoriaService();

    const ui = CategoriaUI();

    const usuarioService = UsuarioService();

    const controller = CategoriaController(service, ui, usuarioService);

    controller.iniciar();

})