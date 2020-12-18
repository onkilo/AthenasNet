"use strict";

window.addEventListener('load', function () {
  var usuarioService = UsuarioService();
  var ui = InicioUI();
  var controller = InicioController(usuarioService, ui);
  controller.iniciar();
});
//# sourceMappingURL=inicio.js.map