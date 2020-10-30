




window.addEventListener('load', () => {

    const service = ProductoService();

    const ui = ProductoUI();

    const categoriaService = CategoriaService();

    const controller = ProductoController(service, ui, categoriaService);

    controller.iniciar();

})