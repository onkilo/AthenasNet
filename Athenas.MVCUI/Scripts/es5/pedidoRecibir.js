"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var formRecibir = document.getElementById('form-recibir');
var id = document.getElementById('Id').value;
window.addEventListener('load', function () {
  formRecibir.addEventListener('submit', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var service;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              service = PedidoService();
              _context.prev = 2;
              _context.next = 5;
              return service.recibir(id);

            case 5:
              window.location.href = AthenasNet.MVC_URL_BASE + 'Pedido';
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              console.error(_context.t0);
              AthenasNet.muestraToast({
                cssClass: 'bg-danger',
                mensaje: 'Hubo un error al recibir este pedido',
                titulo: 'Error'
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});
//# sourceMappingURL=pedidoRecibir.js.map