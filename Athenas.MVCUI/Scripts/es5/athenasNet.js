"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var MVC_URL_BASE = 'http://localhost:62622/';
  var ACCION_MOSTRAR_SPINNER = 'mostrar';
  var ACCION_OCULTAR_SPINNER = 'mostrar';

  var llamadaApi = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(opciones) {
      var opcionsDefecto, respuesta;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              opcionsDefecto = {
                beforeSend: function beforeSend() {//manejaSpinner(ACCION_MOSTRAR_SPINNER);
                },
                contentType: 'application/json',
                data: {},
                type: 'GET'
              };
              _context.prev = 1;
              _context.next = 4;
              return $.ajax(_objectSpread(_objectSpread(_objectSpread({}, opcionsDefecto), opciones), {}, {
                url: MVC_URL_BASE + opciones.url
              }));

            case 4:
              respuesta = _context.sent;

              if (!(respuesta.Codigo !== 200)) {
                _context.next = 7;
                break;
              }

              throw respuesta;

            case 7:
              return _context.abrupt("return", respuesta);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              throw _context.t0;

            case 13:
              _context.prev = 13;
              return _context.finish(13);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 10, 13, 15]]);
    }));

    return function llamadaApi(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var manejaSpinner = function manejaSpinner(estado) {
    var spinner = document.querySelector('.spinner-container');
    if (estado === 'mostrar') spinner.style.display = 'flex';else spinner.style.display = 'none';
  };

  window.AthenasNet = {
    llamadaApi: llamadaApi,
    manejaSpinner: manejaSpinner
  };
})();

window.addEventListener('load', function () {
  $('#general-toast').toast();
});
//# sourceMappingURL=athenasNet.js.map