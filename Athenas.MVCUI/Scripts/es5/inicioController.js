"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var InicioController = function InicioController(ui, usuarioService) {
  var muestraInfoPrincipal = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var infoPrincipal;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return usuarioService.infoPrincipal();

            case 3:
              infoPrincipal = _context.sent;
              ui.setCantCliente(infoPrincipal.CantClientes);
              ui.setCantProducto(infoPrincipal.CantProductos);
              ui.setCantUsuario(infoPrincipal.CantUsuarios);
              ui.setCantVenta(infoPrincipal.CantVentas);
              ui.setPromoData({
                filas: infoPrincipal.PromosActuales.map(function (prom) {
                  return {
                    Producto: prom.Producto,
                    FDescuento: prom.Tipo === 0 ? AthenasNet.formatPrecio(prom.Valor) : "% ".concat(prom.Valor.toFixed(2))
                  };
                })
              });
              ui.setProductoData({
                filas: infoPrincipal.ProductosBajoStock
              });
              console.log(infoPrincipal);
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              AthenasNet.muestraToast({
                cssClass: 'bg-danger',
                mensaje: 'Error al obtener la información',
                titulo: 'Error'
              });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }));

    return function muestraInfoPrincipal() {
      return _ref.apply(this, arguments);
    };
  }();

  var iniciar = function iniciar() {
    muestraInfoPrincipal();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=inicioController.js.map