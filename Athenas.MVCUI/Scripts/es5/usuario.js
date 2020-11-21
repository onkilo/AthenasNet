"use strict";

window.addEventListener('load', function () {
  var service = UsuarioService();
  var ui = UsuarioUI();
  var controller = UsuarioController(service, ui);
  controller.iniciar();
});
//# sourceMappingURL=usuario.js.map