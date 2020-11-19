"use strict";

window.addEventListener('load', function () {
  var service = ClienteService();
  var ui = ClienteUI();
  var controller = ClienteController(service, ui);
  controller.iniciar();
});
//# sourceMappingURL=cliente.js.map