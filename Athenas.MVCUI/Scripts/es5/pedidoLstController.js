"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PedidoController = function PedidoController(service, ui) {
  var lstPedidos = [];
  var pedSeleccionado = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muestraPedidos = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var filtros,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              filtros = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              _context.prev = 1;
              _context.next = 4;
              return service.listar(filtros);

            case 4:
              lstPedidos = _context.sent;
              ui.generarTabla(lstPedidos.map(function (p) {
                var importe = 0;
                p.Detalles.forEach(function (det) {
                  return importe += (_readOnlyError("importe"), det.Precio * det.Cantidad);
                });
                return {
                  Id: p.Id,
                  Fecha: p.FFecha,
                  Empleado: p.Trabajador.Nombre + ' ' + p.Trabajador.Apellido,
                  Proveedor: p.Proveedor.RzSocial,
                  Importe: importe,
                  Estado: p.StockMin
                };
              }));
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));

    return function muestraPedidos() {
      return _ref.apply(this, arguments);
    };
  }();

  var manejaEvtTabla = function manejaEvtTabla() {
    Mant.getTblMantenedor().addEventListener('click', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(evt) {
        var _evt$target$dataset, id, accion;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (evt.target.dataset.id) {
                  _evt$target$dataset = evt.target.dataset, id = _evt$target$dataset.id, accion = _evt$target$dataset.accion;
                  pedSeleccionado = lstPedidos.find(function (c) {
                    return c.Id === parseInt(id);
                  });
                  pedSeleccionado.accion = accion;

                  if (accion === 'editar') {
                    window.location.href = "".concat(AthenasNet.MVC_URL_BASE, "/Pedido/Edit/").concat(pedSeleccionado.Id);
                  } else if (accion === 'eliminar') {
                    console.log('eliminar');
                    AthenasNet.mostrarConfirmacion();
                  }
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioConf = function manejaEnvioConf() {
    AthenasNet.getFormConfirmar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(evt) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                _context3.prev = 1;
                _context3.next = 4;
                return service.eliminar(parseInt(pedSeleccionado.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'El pedido fue eliminado satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context3.next = 8;
                return muestraPedidos();

              case 8:
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                console.error(_context3.t0);
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: 'Hubo un error en la eliminación',
                  titulo: 'Eliminación errónea'
                });

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioFiltro = function manejaEnvioFiltro() {
    Mant.getFormFiltrar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(evt) {
        var filtros;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                filtros = ui.getFiltros();
                _context4.next = 4;
                return muestraPedidos(filtros);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }());
  };

  var iniciar = function iniciar() {
    muestraPedidos();
    Mant.evtMostrarModMant();
    manejaEvtTabla();
    manejaEnvioConf();
    manejaEnvioFiltro();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=pedidoLstController.js.map