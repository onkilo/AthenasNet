"use strict";

window.addEventListener('load', function () {
  var service = CategoriaService();
  var ui = CategoriaUI();
  var controller = CategoriaController(service, ui);
  controller.iniciar();
});
//# sourceMappingURL=categoria.js.map