"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var VentaController = function VentaController(service, ui) {
  var lstVentas = [];
  var ventaSeleccionada = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muestraVentas = /*#__PURE__*/function () {
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
              lstVentas = _context.sent;
              ui.generarTabla(lstVentas.map(function (p) {
                return {
                  Id: p.Id,
                  Cliente: p.Cliente.Nombre + ' ' + p.Cliente.Apellido,
                  Colaborador: p.Trabajador.Nombre + ' ' + p.Trabajador.Apellido,
                  Fecha: AthenasNet.formatFecha(p.FFecha),
                  Importe: AthenasNet.formatPrecio(p.Total)
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

    return function muestraVentas() {
      return _ref.apply(this, arguments);
    };
  }();

  var manejaEvtTabla = function manejaEvtTabla() {
    Mant.getTblMantenedor().addEventListener('click', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(evt) {
        var _evt$target$dataset, id, accion, subtotal, descuento, total, ventaMostrada;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!evt.target.dataset.id) {
                  _context2.next = 11;
                  break;
                }

                _evt$target$dataset = evt.target.dataset, id = _evt$target$dataset.id, accion = _evt$target$dataset.accion;
                ventaSeleccionada = lstVentas.find(function (c) {
                  return c.Id === parseInt(id);
                });
                ventaSeleccionada.accion = accion;

                if (!(accion === 'editar')) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 7;
                return muestraVentas();

              case 7:
                Mant.setFormMantenedor(_objectSpread(_objectSpread({}, ventaSeleccionada), {}, {
                  Valor: parseFloat(ventaSeleccionada.Valor).toFixed(2),
                  Producto: ventaSeleccionada.Producto.Id,
                  Fecha: ventaSeleccionada.FFecha
                }), ['Activo', 'FFecha']);
                _context2.next = 11;
                break;

              case 10:
                if (accion === 'eliminar') {
                  console.log('eliminar');
                  AthenasNet.mostrarConfirmacion();
                } else if (accion === 'detalle') {
                  ui.abreModalVenta();
                  subtotal = 0;
                  descuento = 0;
                  total = 0;
                  ventaSeleccionada.Detalles.forEach(function (det) {
                    subtotal += parseInt(det.Cantidad) * parseFloat(det.Precio), descuento += parseInt(det.Cantidad) * parseFloat(det.DesctUni), total += parseInt(det.Cantidad) * parseFloat(det.Precio) - parseInt(det.Cantidad) * parseFloat(det.DesctUni);
                  });
                  ventaMostrada = {
                    Codigo: AthenasNet.formatCodigo(ventaSeleccionada.Id, 'VEN', 4),
                    FFecha: ventaSeleccionada.FFecha,
                    Colaborador: ventaSeleccionada.Trabajador.Nombre + ' ' + ventaSeleccionada.Trabajador.Apellido,
                    Cliente: {
                      Nombre: ventaSeleccionada.Cliente.Nombre,
                      Dni: ventaSeleccionada.Cliente.Dni,
                      Telefono: ventaSeleccionada.Cliente.Telefono
                    },
                    Detalles: ventaSeleccionada.Detalles.map(function (det) {
                      return {
                        Codigo: AthenasNet.formatCodigo(det.Producto.Id, 'PRD', 4),
                        Descripcion: det.Producto.Descripcion,
                        Precio: AthenasNet.formatPrecio(det.Precio),
                        Cantidad: det.Cantidad,
                        SubTotal: AthenasNet.formatPrecio(det.Cantidad * det.Precio),
                        Descuento: AthenasNet.formatPrecio(det.Cantidad * det.DesctUni)
                      };
                    }),
                    SubTotal: subtotal.toFixed(2),
                    Descuento: descuento.toFixed(2),
                    Total: total.toFixed(2)
                  };
                  ui.setModalVentaData(ventaMostrada);
                }

              case 11:
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
                return service.eliminar(parseInt(ventaSeleccionada.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'La venta fue eliminada satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context3.next = 8;
                return muestraVentas();

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
                return muestraVentas(filtros);

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
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              manejaEvtTabla();
              manejaEnvioConf();
              manejaEnvioFiltro();
              _context5.next = 5;
              return muestraVentas();

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
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=ventaLstController.js.map