"use strict";

window.addEventListener('load', function () {
  var service = PromocionService();
  var ui = ProductoUI();
  var productoService = ProductoService();
  var controller = ProductoController(service, ui, productoService);
  controller.iniciar();
});
//# sourceMappingURL=promocion.js.map