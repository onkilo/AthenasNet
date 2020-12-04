"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PedidoController = function PedidoController(service, ui) {
  var iniciar = function iniciar() {
    var btnRecibir = ui.getBtnPostRecibir();
    btnRecibir.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var Id;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Id = btnRecibir.dataset.Id;
              _context.prev = 1;
              _context.next = 4;
              return service.recibir(Id);

            case 4:
              AthenasNet.muestraToast({
                cssClass: 'bg-danger',
                mensaje: 'El pedido fue recibido exitosamente',
                titulo: 'Error'
              });
              window.location.href = AthenasNet.MVC_URL_BASE + 'Pedido';
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);
              AthenasNet.muestraToast({
                cssClass: 'bg-danger',
                mensaje: 'hubo un error al recibir el pedido',
                titulo: 'Error'
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    })));
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=pedidoRecibirController.js.map