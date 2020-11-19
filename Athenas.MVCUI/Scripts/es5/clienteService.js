"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ClienteService = function ClienteService() {
  var crearCliente = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cliente) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(cliente),
                url: 'Cliente/Crear'
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

    return function crearCliente(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var actualizarCliente = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cliente) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(cliente),
                url: 'Cliente/Actualizar'
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

    return function actualizarCliente(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var listarCliente = /*#__PURE__*/function () {
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
                url: 'Cliente/Listar'
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

    return function listarCliente(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var eliminarCliente = /*#__PURE__*/function () {
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
                url: 'Cliente/Eliminar'
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

    return function eliminarCliente(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var buscarCliente = /*#__PURE__*/function () {
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
                url: 'Cliente/Obtener'
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

    return function buscarCliente(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    crearCliente: crearCliente,
    actualizarCliente: actualizarCliente,
    listarCliente: listarCliente,
    eliminarCliente: eliminarCliente,
    buscarCliente: buscarCliente
  };
};
//# sourceMappingURL=clienteService.js.map