window.addEventListener('load', () => {

    const service = ProductoService();

    const usuarioService = UsuarioService();

    const ui = ProductoUI();

    const categoriaService = CategoriaService();

    const controller = ProductoController(service, ui, categoriaService, usuarioService);

    controller.iniciar();

})