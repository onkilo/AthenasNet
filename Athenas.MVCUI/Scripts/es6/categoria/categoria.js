window.addEventListener('load', () => {

    const service = CategoriaService();

    const ui = CategoriaUI();

    const controller = CategoriaController(service, ui);

    controller.iniciar();

})