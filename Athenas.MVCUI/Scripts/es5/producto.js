"use strict";

window.addEventListener('load', function () {
  var service = ProductoService();
  var usuarioService = UsuarioService();
  var ui = ProductoUI();
  var categoriaService = CategoriaService();
  var controller = ProductoController(service, ui, categoriaService, usuarioService);
  controller.iniciar();
});
//# sourceMappingURL=producto.js.map