"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ProductoService = function ProductoService() {
  var crear = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(producto) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(producto),
                url: 'Producto/Crear'
              });

            case 2:
              respuesta = _context.sent;
              return _context.abrupt("return", respuesta);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function crear(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var actualizar = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(producto) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(producto),
                url: 'Producto/Actualizar'
              });

            case 2:
              respuesta = _context2.sent;
              return _context2.abrupt("return", respuesta);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function actualizar(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var listar = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(filtros) {
      var filtrosDefecto, respuesta;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              filtrosDefecto = _objectSpread({
                Descripcion: ''
              }, filtros);
              _context3.next = 3;
              return AthenasNet.llamadaApi({
                data: filtrosDefecto,
                url: 'Producto/Listar'
              });

            case 3:
              respuesta = _context3.sent;
              return _context3.abrupt("return", respuesta.Data);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function listar(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var eliminar = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return AthenasNet.llamadaApi({
                data: {
                  Id: id
                },
                url: 'Producto/Eliminar'
              });

            case 2:
              respuesta = _context4.sent;
              return _context4.abrupt("return", respuesta);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function eliminar(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var buscar = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return AthenasNet.llamadaApi({
                data: {
                  Id: id
                },
                url: 'Producto/Obtener'
              });

            case 2:
              respuesta = _context5.sent;
              return _context5.abrupt("return", respuesta);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function buscar(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    crear: crear,
    actualizar: actualizar,
    listar: listar,
    eliminar: eliminar,
    buscar: buscar
  };
};

var ProductoUI = function ProductoUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Descripcion'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstProductos) {
    var data = {
      filas: lstProductos,
      edita: true,
      elimina: true,
      iniCodigo: 'PD'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getProducto = function getProducto() {
    return AthenasNet.Mant.getEntidad(['Descripcion', 'Id', 'accion', 'PrecioCompra', 'PrecioVenta', 'StockActual', 'StockMin', 'Imagen']);
  };

  var getImgInput = function getImgInput() {
    return document.querySelector('#form-mantenedor #Imagen');
  };

  var getImgDisplay = function getImgDisplay() {
    return document.querySelector('#imgDisplay');
  };

  var getBase64Data = function getBase64Data(archivo) {
    //const lector = new FileReader();
    //lector.onload = (evt) => {
    //    console.log(evt.target.result);
    //    getImgDisplay().src = evt.target.result;
    //};
    //lector.onerror = (err) => {
    //    console.error(err);
    //};
    //lector.readAsDataURL(archivo);
    return new Promise(function (resolve, reject) {
      var lector = new FileReader();

      lector.onload = function (evt) {
        resolve(evt.target.result);
      };

      lector.onerror = function (err) {
        reject(err);
      };

      lector.readAsDataURL(archivo);
    });
  };

  return {
    getProducto: getProducto,
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    getImgInput: getImgInput,
    getBase64Data: getBase64Data,
    getImgDisplay: getImgDisplay
  };
};

var ProductoController = function ProductoController(service, ui) {
  var lstProductos = [];
  var prodSeleccionado = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muestraProductos = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var filtros,
          _args6 = arguments;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              filtros = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
              _context6.prev = 1;
              _context6.next = 4;
              return service.listar(filtros);

            case 4:
              lstProductos = _context6.sent;
              ui.generarTabla(lstProductos.map(function (p) {
                return {
                  Id: p.Id,
                  Descripcion: p.Descripcion,
                  PrecioCompra: p.PrecioCompra,
                  PrecioVenta: p.PrecioVenta,
                  StockActual: p.StockActual,
                  StockMin: p.StockMin,
                  Categoria: p.Categoria.Descripcion
                };
              }));
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

    return function muestraProductos() {
      return _ref6.apply(this, arguments);
    };
  }();

  var manejaEvtTabla = function manejaEvtTabla() {
    Mant.getTblMantenedor().addEventListener('click', function (evt) {
      if (evt.target.dataset.id) {
        var _evt$target$dataset = evt.target.dataset,
            id = _evt$target$dataset.id,
            accion = _evt$target$dataset.accion;
        prodSeleccionado = lstProductos.find(function (c) {
          return c.Id === parseInt(id);
        });
        prodSeleccionado.accion = accion;

        if (accion === 'editar') {
          Mant.setFormMantenedor(_objectSpread(_objectSpread({}, prodSeleccionado), {}, {
            Categoria: prodSeleccionado.Categoria.Id
          }), ['Imagen', 'Activo', 'Base64Imagen']);
          ui.getImgDisplay().src = prodSeleccionado.Imagen;
        } else if (accion === 'eliminar') {
          console.log('eliminar');
          AthenasNet.mostrarConfirmacion();
        }
      }
    });
  };

  var manejaEnvioProd = function manejaEnvioProd() {
    Mant.getFormMantenedor().addEventListener('submit', /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(evt) {
        var producto, mensaje, titulo;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                evt.preventDefault();
                producto = ui.getProducto();

                if (ui.getImgDisplay().src.startsWith('data')) {
                  producto.Base64Imagen = ui.getImgDisplay().src;
                }

                delete producto.Imagen;
                console.log(producto);
                _context7.prev = 5;

                if (!(producto.accion === 'registrar')) {
                  _context7.next = 13;
                  break;
                }

                _context7.next = 9;
                return service.crear(producto);

              case 9:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'El producto se registró satisfactoriamente',
                  titulo: 'Registro exitoso'
                });
                _context7.next = 18;
                break;

              case 13:
                if (!(producto.accion === 'editar')) {
                  _context7.next = 18;
                  break;
                }

                _context7.next = 16;
                return service.actualizar(producto);

              case 16:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'El producto se actualizó satisfactoriamente',
                  titulo: 'Actualización exitosa'
                });

              case 18:
                _context7.next = 20;
                return muestraProductos();

              case 20:
                _context7.next = 28;
                break;

              case 22:
                _context7.prev = 22;
                _context7.t0 = _context7["catch"](5);
                console.error(_context7.t0);
                mensaje = categoria.accion === 'registrar' ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                titulo = categoria.accion === 'registrar' ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: mensaje,
                  titulo: titulo
                });

              case 28:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[5, 22]]);
      }));

      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioConf = function manejaEnvioConf() {
    AthenasNet.getFormConfirmar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(evt) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                _context8.prev = 1;
                _context8.next = 4;
                return service.eliminar(parseInt(prodSeleccionado.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'El producto fue eliminado satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context8.next = 8;
                return muestraProductos();

              case 8:
                _context8.next = 14;
                break;

              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8["catch"](1);
                console.error(_context8.t0);
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: 'Hubo un error en la eliminación',
                  titulo: 'Eliminación errónea'
                });

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 10]]);
      }));

      return function (_x7) {
        return _ref8.apply(this, arguments);
      };
    }());
  };

  var manejaEnvioFiltro = function manejaEnvioFiltro() {
    Mant.getFormFiltrar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(evt) {
        var filtros;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                evt.preventDefault(); //evitar la accion del evento

                filtros = ui.getFiltros();
                _context9.next = 4;
                return muestraProductos(filtros);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x8) {
        return _ref9.apply(this, arguments);
      };
    }());
  };

  var manejaImgInput = function manejaImgInput() {
    ui.getImgInput().addEventListener('input', /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(evt) {
        var url;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.dir(evt.target);
                _context10.prev = 1;
                _context10.next = 4;
                return ui.getBase64Data(evt.target.files[0]);

              case 4:
                url = _context10.sent;
                ui.getImgDisplay().src = url;
                _context10.next = 11;
                break;

              case 8:
                _context10.prev = 8;
                _context10.t0 = _context10["catch"](1);
                console.error(_context10.t0);

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[1, 8]]);
      }));

      return function (_x9) {
        return _ref10.apply(this, arguments);
      };
    }());
  };

  var iniciar = function iniciar() {
    Mant.configuraTamModal('modal-lg');
    muestraProductos();
    Mant.evtMostrarModMant();
    manejaEvtTabla();
    manejaEnvioProd();
    manejaEnvioConf();
    manejaEnvioFiltro();
    manejaImgInput();
  };

  return {
    iniciar: iniciar
  };
};

window.addEventListener('load', function () {
  var service = ProductoService();
  var ui = ProductoUI();
  var controller = ProductoController(service, ui);
  controller.iniciar();
});
//# sourceMappingURL=producto.js.map