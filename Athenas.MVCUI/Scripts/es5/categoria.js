"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var crearCategoria = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(categoria) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return AthenasNet.llamadaApi({
              type: 'POST',
              data: JSON.stringify(categoria),
              url: 'Categoria/Crear'
            });

          case 3:
            respuesta = _context.sent;
            //activar el toast
            console.log(respuesta);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function crearCategoria(_x) {
    return _ref.apply(this, arguments);
  };
}();

var actualizarCategoria = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(categoria) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return AthenasNet.llamadaApi({
              type: 'POST',
              data: JSON.stringify(categoria),
              url: 'Categoria/Actualizar'
            });

          case 3:
            respuesta = _context2.sent;
            //activar el toast
            console.log(respuesta);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function actualizarCategoria(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var listarCategoria = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(filtros) {
    var filtrosDefecto, respuesta;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            filtrosDefecto = _objectSpread({
              Descripcion: ''
            }, filtros);
            _context3.next = 4;
            return AthenasNet.llamadaApi({
              data: filtrosDefecto,
              url: 'Categoria/Listar'
            });

          case 4:
            respuesta = _context3.sent;
            //activar el toast
            console.log(respuesta);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function listarCategoria(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var buscarCategoria = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return AthenasNet.llamadaApi({
              data: {
                Id: id
              },
              url: 'Categoria/Obtener'
            });

          case 3:
            respuesta = _context4.sent;
            //activar el toast
            console.log(respuesta);
            $('#modal-categoria').modal('hide'); //Limpiar campos

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            //mensaje de error en el toast
            console.error(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function buscarCategoria(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var eliminarCategoria = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return AthenasNet.llamadaApi({
              data: {
                Id: id
              },
              url: 'Categoria/Eliminar'
            });

          case 3:
            respuesta = _context5.sent;
            //activar el toast
            console.log(respuesta);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function eliminarCategoria(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

window.addEventListener('load', function () {
  document.querySelector('#form-categoria').addEventListener('submit', function (evt) {
    evt.preventDefault();
    var categoria = {
      Descripcion: txtDescripcion.value,
      Id: parseInt(document.querySelector('#hdn-id').value)
    };
    buscarCategoria(3005);
  });
});
//# sourceMappingURL=categoria.js.map