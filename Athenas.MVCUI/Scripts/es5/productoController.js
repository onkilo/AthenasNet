"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/// <reference path="../../jquery-3.5.1.slim.js" />
var ProductoController = function ProductoController(service, ui, categoriaService, _ref) {
  var esVendedor = _ref.esVendedor;
  var lstProductos = [];
  var prodSeleccionado = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muestraProductos = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var filtros,
          data,
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
              lstProductos = _context.sent;
              data = {
                filas: lstProductos.map(function (p) {
                  return {
                    Id: p.Id,
                    Descripcion: p.Descripcion,
                    PrecioCompra: AthenasNet.formatPrecio(p.PrecioCompra),
                    PrecioVenta: AthenasNet.formatPrecio(p.PrecioVenta),
                    StockActual: p.StockActual,
                    StockMin: p.StockMin,
                    Categoria: p.Categoria.Descripcion
                  };
                }),
                edita: !esVendedor,
                elimina: !esVendedor,
                iniCodigo: 'PD'
              };
              ui.generarTabla(data);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
    }));

    return function muestraProductos() {
      return _ref2.apply(this, arguments);
    };
  }();

  var manejaEvtTabla = function manejaEvtTabla() {
    Mant.getTblMantenedor().addEventListener('click', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(evt) {
        var _evt$target$dataset, id, accion;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!evt.target.dataset.id) {
                  _context2.next = 22;
                  break;
                }

                _evt$target$dataset = evt.target.dataset, id = _evt$target$dataset.id, accion = _evt$target$dataset.accion;
                prodSeleccionado = lstProductos.find(function (c) {
                  return c.Id === parseInt(id);
                });
                prodSeleccionado.accion = accion;

                if (!(accion === 'editar')) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 7;
                return muestraCategorias();

              case 7:
                Mant.setFormMantenedor(_objectSpread(_objectSpread({}, prodSeleccionado), {}, {
                  PrecioCompra: parseFloat(prodSeleccionado.PrecioCompra).toFixed(2),
                  PrecioVenta: parseFloat(prodSeleccionado.PrecioVenta).toFixed(2),
                  Categoria: prodSeleccionado.Categoria.Id
                }), ['Descuento', 'Imagen', 'Activo', 'Base64Imagen']);
                ui.getImgDisplay().src = prodSeleccionado.Imagen;
                _context2.next = 22;
                break;

              case 11:
                if (!(accion === 'eliminar')) {
                  _context2.next = 16;
                  break;
                }

                console.log('eliminar');
                AthenasNet.mostrarConfirmacion();
                _context2.next = 22;
                break;

              case 16:
                if (!(accion === 'detalle')) {
                  _context2.next = 22;
                  break;
                }

                _context2.next = 19;
                return muestraCategorias();

              case 19:
                Mant.setFormMantenedor(_objectSpread(_objectSpread({}, prodSeleccionado), {}, {
                  PrecioCompra: parseFloat(prodSeleccionado.PrecioCompra).toFixed(2),
                  PrecioVenta: parseFloat(prodSeleccionado.PrecioVenta).toFixed(2),
                  Categoria: prodSeleccionado.Categoria.Id
                }), ['Descuento', 'Imagen', 'Activo', 'Base64Imagen'], true);
                ui.getImgDisplay().src = prodSeleccionado.Imagen;
                ui.muestraDetalle(prodSeleccionado.Categoria);

              case 22:
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

  var manejaEnvioProd = function manejaEnvioProd() {
    Mant.getFormMantenedor().addEventListener('submit', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(evt) {
        var producto, mensaje, titulo;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                evt.preventDefault();
                producto = ui.getProducto();

                if (!(producto.accion !== 'detalle')) {
                  _context3.next = 30;
                  break;
                }

                if (ui.getImgDisplay().src.startsWith('data')) {
                  producto.Base64Imagen = ui.getImgDisplay().src;
                }

                delete producto.Imagen;
                producto = _objectSpread(_objectSpread({}, producto), {}, {
                  Categoria: {
                    Id: parseInt(producto.Categoria)
                  }
                });
                console.log(producto);
                _context3.prev = 7;

                if (!(producto.accion === 'registrar')) {
                  _context3.next = 15;
                  break;
                }

                _context3.next = 11;
                return service.crear(producto);

              case 11:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'El producto se registró satisfactoriamente',
                  titulo: 'Registro exitoso'
                });
                _context3.next = 20;
                break;

              case 15:
                if (!(producto.accion === 'editar')) {
                  _context3.next = 20;
                  break;
                }

                _context3.next = 18;
                return service.actualizar(producto);

              case 18:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'El producto se actualizó satisfactoriamente',
                  titulo: 'Actualización exitosa'
                });

              case 20:
                _context3.next = 22;
                return muestraProductos();

              case 22:
                _context3.next = 30;
                break;

              case 24:
                _context3.prev = 24;
                _context3.t0 = _context3["catch"](7);
                console.error(_context3.t0);
                mensaje = producto.accion === 'registrar' ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                titulo = producto.accion === 'registrar' ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: mensaje,
                  titulo: titulo
                });

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[7, 24]]);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioConf = function manejaEnvioConf() {
    AthenasNet.getFormConfirmar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(evt) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                _context4.prev = 1;
                _context4.next = 4;
                return service.eliminar(parseInt(prodSeleccionado.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'El producto fue eliminado satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context4.next = 8;
                return muestraProductos();

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
        return _ref5.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioFiltro = function manejaEnvioFiltro() {
    Mant.getFormFiltrar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(evt) {
        var filtros;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                filtros = ui.getFiltros();
                _context5.next = 4;
                return muestraProductos(filtros);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x4) {
        return _ref6.apply(this, arguments);
      };
    }());
  };

  var manejaImgInput = function manejaImgInput() {
    ui.getImgInput().addEventListener('input', /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(evt) {
        var url;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.dir(evt.target);
                _context6.prev = 1;
                _context6.next = 4;
                return ui.getBase64Data(evt.target.files[0]);

              case 4:
                url = _context6.sent;
                ui.getImgDisplay().src = url;
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);
                console.error(_context6.t0);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 8]]);
      }));

      return function (_x5) {
        return _ref7.apply(this, arguments);
      };
    }());
  };

  var muestraCategorias = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var lstCategorias, tempCatData;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return categoriaService.listarCategoria({});

            case 2:
              lstCategorias = _context7.sent;
              tempCatData = {
                filas: lstCategorias
              };
              console.log(lstCategorias);
              AthenasNet.compilaTemplate(ui.ID_TEMP_CAT, tempCatData, ui.SEL_CBO_CAT);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function muestraCategorias() {
      return _ref8.apply(this, arguments);
    };
  }();

  var manejaAbreModal = function manejaAbreModal() {
    Mant.getBtnNuevo().addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return muestraCategorias();

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  };

  var validacionUI = function validacionUI() {
    if (esVendedor) {
      ui.muestraVendedor();
    }
  };

  var iniciar = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              validacionUI();
              Mant.configuraTamModal('modal-lg');
              muestraProductos();
              Mant.evtMostrarModMant();
              manejaEvtTabla();
              manejaEnvioProd();
              manejaEnvioConf();
              manejaEnvioFiltro();
              manejaImgInput();
              manejaAbreModal();

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function iniciar() {
      return _ref10.apply(this, arguments);
    };
  }();

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=productoController.js.map