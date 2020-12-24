window.addEventListener('load', async () => {

    const service = ProductoService();

    const ui = ProductoUI();

    const categoriaService = CategoriaService();
    const controller = await conValidacionRoles(ProductoController, [service, ui, categoriaService]);
    

    controller.iniciar();

})