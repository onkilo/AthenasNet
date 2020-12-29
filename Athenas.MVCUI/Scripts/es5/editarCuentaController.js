"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var EditarCuentaController = function EditarCuentaController(service, ui) {
  var cuenta = {};

  var evtFormEditarCuenta = function evtFormEditarCuenta() {
    ui.getFormEditarUsuario().addEventListener('submit', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                evt.preventDefault();
                cuenta = ui.getCuenta();
                console.log(cuenta);
                _context.prev = 3;
                _context.next = 6;
                return service.editarCuenta(cuenta);

              case 6:
                AthenasNet.muestraToast({
                  cssClass: 'bg-success',
                  mensaje: 'Datos editados satisfactoriamente',
                  titulo: 'Éxito'
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);
                console.error(_context.t0);
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: 'Hubo un problema al editar los datos de la cuenta',
                  titulo: 'Error'
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  var iniciar = function iniciar() {
    evtFormEditarCuenta();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=editarCuentaController.js.map