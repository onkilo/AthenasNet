"use strict";

window.addEventListener('load', function () {
  var service = PedidoService();
  var ui = PedidoUI();
  var controller = PedidoController(service, ui);
  controller.iniciar();
});
//# sourceMappingURL=pedido.js.map