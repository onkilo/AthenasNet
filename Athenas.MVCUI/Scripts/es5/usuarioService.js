"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UsuarioService = function UsuarioService() {
  var crear = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(usuario) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(usuario),
                url: 'Usuario/Crear'
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(usuario) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(usuario),
                url: 'Usuario/Actualizar'
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
                Nombre: ''
              }, filtros);
              _context3.next = 3;
              return AthenasNet.llamadaApi({
                data: filtrosDefecto,
                url: 'Usuario/Listar'
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
                url: 'Usuario/Eliminar'
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
                url: 'Usuario/Obtener'
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

  var roles = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return AthenasNet.llamadaApi({
                data: {},
                url: 'Usuario/Roles'
              });

            case 2:
              respuesta = _context6.sent;
              return _context6.abrupt("return", respuesta.Data);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function roles() {
      return _ref6.apply(this, arguments);
    };
  }();

  var infoPrincipal = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: {},
                url: 'Usuario/InfoPrincipal'
              });

            case 2:
              respuesta = _context7.sent;
              return _context7.abrupt("return", respuesta.Data);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function infoPrincipal() {
      return _ref7.apply(this, arguments);
    };
  }();

  var rolesActuales = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return AthenasNet.llamadaApi({
                data: {},
                url: 'Usuario/RolesActuales'
              });

            case 2:
              respuesta = _context8.sent;
              return _context8.abrupt("return", respuesta.Data);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function rolesActuales() {
      return _ref8.apply(this, arguments);
    };
  }();

  var editarCuenta = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(cuenta) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(cuenta),
                url: 'Usuario/EditarCuenta'
              });

            case 2:
              respuesta = _context9.sent;
              return _context9.abrupt("return", respuesta.Data);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function editarCuenta(_x6) {
      return _ref9.apply(this, arguments);
    };
  }();

  return {
    crear: crear,
    actualizar: actualizar,
    listar: listar,
    eliminar: eliminar,
    buscar: buscar,
    roles: roles,
    infoPrincipal: infoPrincipal,
    rolesActuales: rolesActuales,
    editarCuenta: editarCuenta
  };
};
//# sourceMappingURL=usuarioService.js.map