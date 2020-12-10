"use strict";

window.addEventListener('load', function () {
  var service = VentaService();
  var ui = VentaUI();
  var clienteService = null,
      productoService = null;

  if (window.ClienteService) {
    clienteService = ClienteService();
  }

  if (window.ProductoService) {
    productoService = ProductoService();
  }

  var controller = VentaController(service, ui, clienteService, productoService);
  controller.iniciar();
});
//# sourceMappingURL=venta.js.map