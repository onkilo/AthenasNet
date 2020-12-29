"use strict";

window.addEventListener('load', function () {
  var service = UsuarioService();
  var ui = EditarCuentaUI();
  var controller = EditarCuentaController(service, ui);
  controller.iniciar();
});
//# sourceMappingURL=editarCuenta.js.map