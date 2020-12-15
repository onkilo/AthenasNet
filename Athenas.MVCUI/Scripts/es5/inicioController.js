"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var InicioController = function InicioController(ui, usuarioService) {
  var lstRoles = [];

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

  var validacionUI = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return usuarioService.rolesActuales();

            case 3:
              lstRoles = _context2.sent;
              console.log(lstRoles);

              if (lstRoles.length == 1 && lstRoles[0].Nombre === 'Vendedor') {
                ui.ocultarVendedor();
              }

              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    return function validacionUI() {
      return _ref2.apply(this, arguments);
    };
  }();

  var iniciar = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return validacionUI();

            case 2:
              muestraInfoPrincipal();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function iniciar() {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=inicioController.js.map