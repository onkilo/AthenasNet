"use strict";

window.addEventListener('load', function () {
  var ui = InicioUI();
  var usuarioService = UsuarioService();
  var controller = InicioController(ui, usuarioService);
  controller.iniciar();
});
//# sourceMappingURL=inicio.js.map