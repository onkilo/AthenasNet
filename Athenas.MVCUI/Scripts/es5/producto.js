"use strict";

window.addEventListener('load', function () {
  var service = ProductoService();
  var ui = ProductoUI();
  var categoriaService = CategoriaService();
  var controller = ProductoController(service, ui, categoriaService);
  controller.iniciar();
});
//# sourceMappingURL=producto.js.map