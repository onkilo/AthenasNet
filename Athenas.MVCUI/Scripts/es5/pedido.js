"use strict";

window.addEventListener('load', function () {
  var service = PedidoService();
  var ui = PedidoUI();
  var productoService = null,
      proveedorService = null;

  if (window.ProductoService) {
    productoService = ProductoService();
  }

  if (window.ProveedorService) {
    proveedorService = ProveedorService();
  }

  var controller = PedidoController(service, ui, proveedorService, productoService);
  controller.iniciar();
});
//# sourceMappingURL=pedido.js.map