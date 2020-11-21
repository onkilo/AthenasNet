"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UsuarioController = function UsuarioController(service, ui) {
  var lstUsuario = [];
  var usuSeleccionado = {};
  var _AthenasNet = AthenasNet,
      Mant = _AthenasNet.Mant;

  var muestraUsuarios = /*#__PURE__*/function () {
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
              lstUsuario = _context.sent;
              ui.generarTabla(lstUsuario.map(function (p) {
                return {
                  Id: p.Id,
                  Nombre: p.Nombre,
                  Apellido: p.Apellido,
                  Dni: p.Dni,
                  Telefono: p.Telefono,
                  Sexo: p.Sexo === 'M' ? 'Masculino' : 'Femenino',
                  Roles: p.Roles.map(function (rol) {
                    return rol.Nombre;
                  }).join(', ')
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

    return function muestraUsuarios() {
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
                  _context2.next = 12;
                  break;
                }

                _evt$target$dataset = evt.target.dataset, id = _evt$target$dataset.id, accion = _evt$target$dataset.accion;
                usuSeleccionado = lstUsuario.find(function (c) {
                  return c.Id === parseInt(id);
                });
                usuSeleccionado.accion = accion;

                if (!(accion === 'editar')) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 7;
                return muestraRoles();

              case 7:
                console.log(usuSeleccionado);
                Mant.setFormMantenedor(_objectSpread({}, usuSeleccionado), ['SexoDescripcion', 'Activo', 'Token', 'Roles']);
                _context2.next = 12;
                break;

              case 11:
                if (accion === 'eliminar') {
                  console.log('eliminar');
                  AthenasNet.mostrarConfirmacion();
                }

              case 12:
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

  var manejaEnvioUsu = function manejaEnvioUsu() {
    Mant.getFormMantenedor().addEventListener('submit', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(evt) {
        var usuario, mensaje, titulo;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                evt.preventDefault();
                debugger;
                usuario = ui.getUsuario();
                usuario = _objectSpread(_objectSpread({}, usuario), {}, {
                  Roles: usuario.Roles.map(function (rol) {
                    return {
                      Id: parseInt(rol)
                    };
                  })
                });
                console.log(usuario);
                _context3.prev = 5;

                if (!(usuario.accion === 'registrar')) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 9;
                return service.crear(usuario);

              case 9:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'El usuario se registró satisfactoriamente',
                  titulo: 'Registro exitoso'
                });
                _context3.next = 18;
                break;

              case 13:
                if (!(usuario.accion === 'editar')) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 16;
                return service.actualizar(usuario);

              case 16:
                Mant.cerrarModMant();
                AthenasNet.muestraToast({
                  mensaje: 'El usuario se actualizó satisfactoriamente',
                  titulo: 'Actualización exitosa'
                });

              case 18:
                usuSeleccionado = {};
                _context3.next = 21;
                return muestraUsuarios();

              case 21:
                _context3.next = 29;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](5);
                console.error(_context3.t0);
                mensaje = usuario.accion === 'registrar' ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                titulo = usuario.accion === 'registrar' ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: mensaje,
                  titulo: titulo
                });

              case 29:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 23]]);
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
                return service.eliminar(parseInt(usuSeleccionado.Id));

              case 4:
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({
                  mensaje: 'El usuario fue eliminado satisfactoriamente',
                  titulo: 'Eliminación exitosa'
                });
                _context4.next = 8;
                return muestraUsuarios();

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
                return muestraUsuarios(filtros);

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

  var muestraRoles = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var lstRoles, tempRolData;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return service.roles({});

            case 2:
              lstRoles = _context6.sent;

              if (usuSeleccionado.Roles) {
                lstRoles = lstRoles.map(function (rol) {
                  var encontrado = usuSeleccionado.Roles.find(function (rolUsuario) {
                    return rolUsuario.Id === rol.Id;
                  });

                  if (encontrado) {
                    return _objectSpread(_objectSpread({}, rol), {}, {
                      selected: true
                    });
                  } else {
                    return _objectSpread(_objectSpread({}, rol), {}, {
                      selected: false
                    });
                  }
                });
              }

              tempRolData = {
                filas: lstRoles
              };
              console.log(lstRoles);
              AthenasNet.compilaTemplate(ui.ID_TEMP_ROL, tempRolData, ui.SEL_CBO_ROL);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function muestraRoles() {
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
              return muestraRoles();

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
    muestraUsuarios();
    Mant.evtMostrarModMant();
    manejaEvtTabla();
    manejaEnvioUsu();
    manejaEnvioConf();
    manejaEnvioFiltro();
    manejaAbreModal();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=usuarioController.js.map