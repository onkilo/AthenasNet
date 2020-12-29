"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

window.addEventListener('load', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var service, ui, proveedorService, productoService, controller;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          service = PedidoService();
          ui = PedidoUI();
          proveedorService = null, productoService = null;

          if (window.ProveedorService) {
            proveedorService = ProveedorService();
          }

          if (window.ProductoService) {
            productoService = ProductoService();
          }

          controller = null; //if (window.conValidacionRoles) {
          //    controller = await conValidacionRoles(PedidoController, [ui, proveedorService, productoService])
          //}
          //else {
          //    controller = PedidoController(service, ui, proveedorService, productoService);
          //}

          if (!window.conValidacionRoles) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return conValidacionRoles(PedidoController, [service, ui, proveedorService, productoService]);

        case 9:
          _context.t0 = _context.sent;
          _context.next = 15;
          break;

        case 12:
          _context.next = 14;
          return PedidoController(service, ui, proveedorService, productoService);

        case 14:
          _context.t0 = _context.sent;

        case 15:
          controller = _context.t0;
          controller.iniciar();

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
//# sourceMappingURL=pedido.js.map