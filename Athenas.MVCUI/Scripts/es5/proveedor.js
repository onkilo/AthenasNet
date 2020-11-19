"use strict";

window.addEventListener('load', function () {
  var service = ProveedorService();
  var ui = ProveedorUI();
  var controller = ProveedorController(service, ui);
  controller.iniciar();
});
//# sourceMappingURL=proveedor.js.map