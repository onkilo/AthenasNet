"use strict";

window.addEventListener('load', function () {
  var service = CategoriaService();
  var ui = CategoriaUI();
  var usuarioService = UsuarioService();
  var controller = CategoriaController(service, ui, usuarioService);
  controller.iniciar();
});
//# sourceMappingURL=categoria.js.map