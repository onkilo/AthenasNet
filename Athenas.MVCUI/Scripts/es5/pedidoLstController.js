"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PedidoController = function PedidoController(service, ui, arg3, arg4, _ref) {
  var esVendedor = _ref.esVendedor;
  var lstPedidos = [];
  var pedidoSeleccionado = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muesraPedidos = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
                p.Detalles.forEach(function (d) {
                  return importe += d.Cantidad * d.Precio;
                });
                return {
                  Id: p.Id,
                  Fecha: AthenasNet.formatFecha(p.FFecha),
                  Colaborador: p.Trabajador.Nombre + ' ' + p.Trabajador.Apellido,
                  Proveedor: p.Proveedor.RzSocial,
                  Importe: AthenasNet.formatPrecio(importe),
                  Estado: p.Estado === 0 ? 'Por Recibir' : 'Recibido',
                  recibe: p.Estado === 0
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

    return function muesraPedidos() {
      return _ref2.apply(this, arguments);
    };
  }();

  var manejaEvtTabla = function manejaEvtTabla() {
    Mant.getTblMantenedor().addEventListener('click', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(evt) {
        var _evt$target$dataset, id, accion, total, pedidoMostrado;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!evt.target.dataset.id) {
                  _context2.next = 11;
                  break;
                }

                _evt$target$dataset = evt.target.dataset, id = _evt$target$dataset.id, accion = _evt$target$dataset.accion;
                pedidoSeleccionado = lstPedidos.find(function (c) {
                  return c.Id === parseInt(id);
                });
                pedidoSeleccionado.accion = accion;

                if (!(accion === 'editar')) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 7;
                return muestraPoductos();

              case 7:
                Mant.setFormMantenedor(_objectSpread(_objectSpread({}, pedidoSeleccionado), {}, {
                  Valor: parseFloat(pedidoSeleccionado.Valor).toFixed(2),
                  Producto: pedidoSeleccionado.Producto.Id,
                  FechaFin: pedidoSeleccionado.FFechaFin,
                  FechaInicio: pedidoSeleccionado.FFechaInicio
                }), ['Activo', 'FFechaInicio', 'FFechaFin']);
                _context2.next = 11;
                break;

              case 10:
                if (accion === 'eliminar') {
                  console.log('eliminar');
                  AthenasNet.mostrarConfirmacion();
                } else if (accion === 'detalle') {
                  ui.abreModalPedido();
                  total = 0;
                  pedidoSeleccionado.Detalles.forEach(function (det) {
                    total += parseInt(det.Cantidad) * parseFloat(det.Precio);
                  });
                  pedidoMostrado = {
                    Codigo: AthenasNet.formatCodigo(pedidoSeleccionado.Id, 'PED', 4),
                    FFecha: pedidoSeleccionado.FFecha,
                    Colaborador: pedidoSeleccionado.Trabajador.Nombre + ' ' + pedidoSeleccionado.Trabajador.Apellido,
                    Proveedor: {
                      RzSocial: pedidoSeleccionado.Proveedor.RzSocial,
                      Direccion: pedidoSeleccionado.Proveedor.Direccion,
                      Telefono: pedidoSeleccionado.Proveedor.Telefono
                    },
                    Detalles: pedidoSeleccionado.Detalles.map(function (det) {
                      return {
                        Codigo: AthenasNet.formatCodigo(det.Producto.Id, 'PRD', 4),
                        Descripcion: det.Producto.Descripcion,
                        Precio: AthenasNet.formatPrecio(det.Precio),
                        Cantidad: det.Cantidad,
                        Subtotal: AthenasNet.formatPrecio(det.Cantidad * det.Precio)
                      };
                    }),
                    Total: total.toFixed(2)
                  };
                  ui.setModalPedidoData(pedidoMostrado);
                }

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioConf = function manejaEnvioConf() {
    AthenasNet.getFormConfirmar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(evt) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                _context3.prev = 1;
                _context3.next = 4;
                return service.eliminar(parseInt(pedidoSeleccionado.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'El pedido fue eliminado satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context3.next = 8;
                return muesraPedidos();

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
        return _ref4.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioFiltro = function manejaEnvioFiltro() {
    Mant.getFormFiltrar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(evt) {
        var filtros;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                filtros = ui.getFiltros();
                _context4.next = 4;
                return muesraPedidos(filtros);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
  };

  var muestraMensaje = function muestraMensaje() {
    if (localStorage.getItem('mensaje')) {
      var mensaje = JSON.parse(localStorage.getItem('mensaje'));
      AthenasNet.muestraToast({
        mensaje: mensaje.texto,
        titulo: mensaje.titulo,
        cssClass: mensaje.color
      });
      localStorage.removeItem('mensaje');
    }
  };

  var iniciar = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              manejaEvtTabla();
              manejaEnvioConf();
              manejaEnvioFiltro();
              _context5.next = 5;
              return muesraPedidos();

            case 5:
              muestraMensaje();

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function iniciar() {
      return _ref6.apply(this, arguments);
    };
  }();

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=pedidoLstController.js.map