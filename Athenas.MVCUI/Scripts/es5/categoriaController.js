"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CategoriaController = function CategoriaController(service, ui) {
  var lstCategorias = [];
  var cateSeleccionada = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muestraCategorias = /*#__PURE__*/function () {
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
              return service.listarCategoria(filtros);

            case 4:
              lstCategorias = _context.sent;
              ui.generarTabla(lstCategorias.map(function (c) {
                return {
                  Id: c.Id,
                  Descripcion: c.Descripcion
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

    return function muestraCategorias() {
      return _ref.apply(this, arguments);
    };
  }();

  var manejaEvtTabla = function manejaEvtTabla() {
    Mant.getTblMantenedor().addEventListener('click', function (evt) {
      if (evt.target.dataset.id) {
        var _evt$target$dataset = evt.target.dataset,
            id = _evt$target$dataset.id,
            accion = _evt$target$dataset.accion;
        cateSeleccionada = lstCategorias.find(function (c) {
          return c.Id === parseInt(id);
        });
        cateSeleccionada.accion = accion;

        if (accion === 'editar') {
          Mant.setFormMantenedor(cateSeleccionada);
        } else if (accion === 'eliminar') {
          console.log('eliminar');
          AthenasNet.mostrarConfirmacion();
        }
      }
    });
  };

  var manejaEnvioCat = function manejaEnvioCat() {
    var formMantenedor = Mant.getFormMantenedor();
    formMantenedor.addEventListener('submit', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(evt) {
        var categoria, mensaje, titulo;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                evt.preventDefault();
                debugger;

                if (!formMantenedor.checkValidity()) {
                  _context2.next = 29;
                  break;
                }

                categoria = ui.getCategoria();
                _context2.prev = 4;

                if (!(categoria.accion === 'registrar')) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 8;
                return service.crearCategoria(categoria);

              case 8:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'La categoría se registró satisfactoriamente',
                  titulo: 'Registro exitoso'
                });
                _context2.next = 17;
                break;

              case 12:
                if (!(categoria.accion === 'editar')) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 15;
                return service.actualizarCategoria(categoria);

              case 15:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'La categoría se actualizó satisfactoriamente',
                  titulo: 'Actualización exitosa'
                });

              case 17:
                _context2.next = 19;
                return muestraCategorias();

              case 19:
                _context2.next = 27;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](4);
                console.error(_context2.t0);
                mensaje = categoria.accion === 'registrar' ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                titulo = categoria.accion === 'registrar' ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: mensaje,
                  titulo: titulo
                });

              case 27:
                _context2.next = 30;
                break;

              case 29:
                Mant.esFormularioValido(false);

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 21]]);
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
                return service.eliminarCategoria(parseInt(cateSeleccionada.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'La categoría fue eliminada satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context3.next = 8;
                return muestraCategorias();

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
                return muestraCategorias(filtros);

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
    muestraCategorias();
    Mant.evtMostrarModMant();
    manejaEvtTabla();
    manejaEnvioCat();
    manejaEnvioConf();
    manejaEnvioFiltro();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=categoriaController.js.map