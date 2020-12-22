"use strict";

window.addEventListener('load', function () {
  var service = PedidoService();
  var ui = PedidoUI();
  var proveedorService = null,
      productoService = null;

  if (window.ProveedorService) {
    proveedorService = ProveedorService();
  }

  if (window.ProductoService) {
    productoService = ProductoService();
  }

  var controller = PedidoController(service, ui, proveedorService, productoService);
  controller.iniciar();
});
//# sourceMappingURL=pedido.js.map