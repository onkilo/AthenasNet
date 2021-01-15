"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ProductoController = function ProductoController(service, ui, productoService) {
  var lstPromociones = [];
  var promSeleccionado = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muestraPromociones = /*#__PURE__*/function () {
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
              lstPromociones = _context.sent;
              ui.generarTabla(lstPromociones.map(function (p) {
                return {
                  Id: p.Id,
                  Producto: p.Producto.Descripcion,
                  Tipo: p.Tipo === 0 ? 'Fijo' : 'Porcentual',
                  Valor: p.Tipo === 0 ? "S/. ".concat(p.Valor.toFixed(2)) : "% ".concat(p.Valor.toFixed(2)),
                  FechaInicio: AthenasNet.formatFecha(p.FFechaInicio),
                  FechaFin: AthenasNet.formatFecha(p.FFechaFin)
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

    return function muestraPromociones() {
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
                if (!evt.target.dataset.id) {
                  _context2.next = 11;
                  break;
                }

                _evt$target$dataset = evt.target.dataset, id = _evt$target$dataset.id, accion = _evt$target$dataset.accion;
                promSeleccionado = lstPromociones.find(function (c) {
                  return c.Id === parseInt(id);
                });
                promSeleccionado.accion = accion;

                if (!(accion === 'editar')) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 7;
                return muestraPoductos();

              case 7:
                Mant.setFormMantenedor(_objectSpread(_objectSpread({}, promSeleccionado), {}, {
                  Valor: parseFloat(promSeleccionado.Valor).toFixed(2),
                  Producto: promSeleccionado.Producto.Id,
                  FechaFin: promSeleccionado.FFechaFin,
                  FechaInicio: promSeleccionado.FFechaInicio
                }), ['Activo', 'FFechaInicio', 'FFechaFin']);
                _context2.next = 11;
                break;

              case 10:
                if (accion === 'eliminar') {
                  console.log('eliminar');
                  AthenasNet.mostrarConfirmacion();
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

  var manejaEnvioProm = function manejaEnvioProm() {
    var formMantenedor = Mant.getFormMantenedor();
    formMantenedor.addEventListener('submit', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(evt) {
        var promocion, tienePromociones, _tienePromociones, mensaje, titulo;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                evt.preventDefault();

                if (!formMantenedor.checkValidity()) {
                  _context3.next = 49;
                  break;
                }

                promocion = ui.getPromocion();
                promocion = _objectSpread(_objectSpread({}, promocion), {}, {
                  Producto: {
                    Id: parseInt(promocion.Producto)
                  }
                });
                console.log(promocion);
                _context3.prev = 5;

                if (!(promocion.accion === 'registrar')) {
                  _context3.next = 24;
                  break;
                }

                _context3.next = 9;
                return service.tienePromociones(promocion.Producto.Id, promocion.FechaInicio, promocion.FechaFin);

              case 9:
                tienePromociones = _context3.sent;
                console.log(tienePromociones);

                if (tienePromociones) {
                  _context3.next = 21;
                  break;
                }

                ui.muestraMsjTienePromo(false);
                _context3.next = 15;
                return service.crear(promocion);

              case 15:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'La promoción se registró satisfactoriamente',
                  titulo: 'Registro exitoso'
                });
                _context3.next = 19;
                return muestraPromociones();

              case 19:
                _context3.next = 22;
                break;

              case 21:
                ui.muestraMsjTienePromo(true);

              case 22:
                _context3.next = 39;
                break;

              case 24:
                if (!(promocion.accion === 'editar')) {
                  _context3.next = 39;
                  break;
                }

                _context3.next = 27;
                return service.tienePromociones(promocion.Producto.Id, promocion.FechaInicio, promocion.FechaFin, promocion.Id);

              case 27:
                _tienePromociones = _context3.sent;

                if (_tienePromociones) {
                  _context3.next = 38;
                  break;
                }

                ui.muestraMsjTienePromo(false);
                _context3.next = 32;
                return service.actualizar(promocion);

              case 32:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'La promoción se actualizó satisfactoriamente',
                  titulo: 'Actualización exitosa'
                });
                _context3.next = 36;
                return muestraPromociones();

              case 36:
                _context3.next = 39;
                break;

              case 38:
                ui.muestraMsjTienePromo(true);

              case 39:
                _context3.next = 47;
                break;

              case 41:
                _context3.prev = 41;
                _context3.t0 = _context3["catch"](5);
                console.error(_context3.t0);
                mensaje = promocion.accion === 'registrar' ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                titulo = promocion.accion === 'registrar' ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: mensaje,
                  titulo: titulo
                });

              case 47:
                _context3.next = 50;
                break;

              case 49:
                Mant.esFormularioValido(false);

              case 50:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 41]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioConf = function manejaEnvioConf() {
    AthenasNet.getFormConfirmar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(evt) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                _context4.prev = 1;
                _context4.next = 4;
                return service.eliminar(parseInt(promSeleccionado.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'La promoción fue eliminada satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context4.next = 8;
                return muestraPromociones();

              case 8:
                _context4.next = 14;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](1);
                console.error(_context4.t0);
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: 'Hubo un error en la eliminación',
                  titulo: 'Eliminación errónea'
                });

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 10]]);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioFiltro = function manejaEnvioFiltro() {
    Mant.getFormFiltrar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(evt) {
        var filtros;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                filtros = ui.getFiltros();
                _context5.next = 4;
                return muestraPromociones(filtros);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }());
  };

  var muestraPoductos = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var lstProductos, tempCatData;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return productoService.listar({});

            case 2:
              lstProductos = _context6.sent;
              tempCatData = {
                filas: lstProductos
              };
              console.log(lstProductos);
              AthenasNet.compilaTemplate(ui.ID_TEMP_PROD, tempCatData, ui.SEL_CBO_PROD);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function muestraPoductos() {
      return _ref6.apply(this, arguments);
    };
  }();

  var manejaAbreModal = function manejaAbreModal() {
    Mant.getBtnNuevo().addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return muestraPoductos();

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  };

  var iniciar = function iniciar() {
    Mant.configuraTamModal('modal-lg');
    muestraPromociones();
    Mant.evtMostrarModMant();
    manejaEvtTabla();
    manejaEnvioProm();
    manejaEnvioConf();
    manejaEnvioFiltro();
    debugger;
    manejaAbreModal();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=promocionController.js.map