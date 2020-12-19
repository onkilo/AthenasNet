"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var InicioController = function InicioController(usuarioService, ui) {
  var infoPrincipal = {};
  var rolesActuales = [];

  var muestraInfoPrincipal = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return usuarioService.infoPrincipal();

            case 2:
              infoPrincipal = _context.sent;
              ui.setCantidades(infoPrincipal);
              ui.setProdBajoStockData({
                filas: infoPrincipal.ProdBajoStock
              });
              ui.setPromoActualData({
                filas: infoPrincipal.PromosActuales.map(function (promo) {
                  return {
                    Producto: {
                      Descripcion: promo.Producto.Descripcion
                    },
                    Descuento: promo.Tipo === 0 ? AthenasNet.formatPrecio(promo.Valor) : "% ".concat(promo.Valor.toFixed(2))
                  };
                })
              });
              console.log(infoPrincipal);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function muestraInfoPrincipal() {
      return _ref.apply(this, arguments);
    };
  }();

  var validacionUI = function validacionUI() {
    if (rolesActuales.length === 1 && rolesActuales[0].Nombre === 'Vendedor') {
      ui.muestraVendedor();
    }
  };

  var getRolesActuales = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return usuarioService.rolesActuales();

            case 3:
              rolesActuales = _context2.sent;
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function getRolesActuales() {
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
              return getRolesActuales();

            case 2:
              _context3.next = 4;
              return muestraInfoPrincipal();

            case 4:
              validacionUI();

            case 5:
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