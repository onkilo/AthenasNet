"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var MVC_URL_BASE = 'http://localhost:62622/';
  var ACCION_MOSTRAR_SPINNER = 'mostrar';
  var ACCION_OCULTAR_SPINNER = 'ocultar';
  var SEL_MODAL_CONF = '#modal-confirmar';
  var ID_FORM_CONFIRMAR = 'form-confirmar';
  var ID_TEMP_TBL_BODY = 'temp-tbl-body';

  var llamadaApi = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(opciones) {
      var opcionsDefecto, respuesta;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              opcionsDefecto = {
                beforeSend: function beforeSend() {
                  manejaSpinner(ACCION_MOSTRAR_SPINNER);
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

              if (respuesta.Codigo === 401) {
                window.location.href = MVC_URL_BASE + 'Seguridad';
              }

              if (respuesta.Codigo === 403) {
                muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: 'No tiene permisos para realizar esta acción',
                  titulo: 'No autorizado'
                });
              }

              if (!(respuesta.Codigo !== 200)) {
                _context.next = 9;
                break;
              }

              throw respuesta;

            case 9:
              return _context.abrupt("return", respuesta);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              throw _context.t0;

            case 15:
              _context.prev = 15;
              //ocultar spinner
              manejaSpinner(ACCION_OCULTAR_SPINNER);
              return _context.finish(15);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 12, 15, 18]]);
    }));

    return function llamadaApi(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var manejaSpinner = function manejaSpinner(estado) {
    var spinner = document.querySelector('.spinner-container');
    if (estado === 'mostrar') spinner.style.display = 'flex';else spinner.style.display = 'none';
  };

  var muestraToast = function muestraToast(_ref2) {
    var _ref2$cssClass = _ref2.cssClass,
        cssClass = _ref2$cssClass === void 0 ? 'bg-success' : _ref2$cssClass,
        _ref2$mensaje = _ref2.mensaje,
        mensaje = _ref2$mensaje === void 0 ? 'Operación exitosa' : _ref2$mensaje,
        _ref2$titulo = _ref2.titulo,
        titulo = _ref2$titulo === void 0 ? 'Éxito' : _ref2$titulo;
    var SEL_TOAST = '#general-toast';
    var SEL_TOAST_TITULO = '#general-toast #toast-titulo';
    var SEL_TOAST_MENSAJE = '#general-toast #toast-mensaje';
    var toast = document.querySelector(SEL_TOAST);
    var clases = ['toast', 'mt-2'];
    clases.push(cssClass);
    toast.className = clases.join(' ');
    document.querySelector(SEL_TOAST_TITULO).innerHTML = titulo;
    document.querySelector(SEL_TOAST_MENSAJE).innerHTML = mensaje;
    $(SEL_TOAST).toast('show');
  };

  var compilaTemplate = function compilaTemplate(idTemplate, data, selObjetivo) {
    var htmlTemplate = document.getElementById(idTemplate).innerHTML;
    var template = Handlebars.compile(htmlTemplate);
    var compTemplate = template(data);
    document.querySelector(selObjetivo).innerHTML = compTemplate;
  };

  var getFormConfirmar = function getFormConfirmar() {
    return document.getElementById(ID_FORM_CONFIRMAR);
  };

  var mostrarConfirmacion = function mostrarConfirmacion() {
    $(SEL_MODAL_CONF).modal('show');
  };

  var ocultarConfirmacion = function ocultarConfirmacion() {
    $(SEL_MODAL_CONF).modal('hide');
  };

  var formatFecha = function formatFecha(fecha) {
    var arrElementos = fecha.split('-');
    var newFecha = arrElementos.reverse().join('/');
    return newFecha;
  };

  var formatPrecio = function formatPrecio(precio) {
    return "S/. ".concat(precio.toFixed(2));
  };

  window.AthenasNet = {
    llamadaApi: llamadaApi,
    manejaSpinner: manejaSpinner,
    muestraToast: muestraToast,
    compilaTemplate: compilaTemplate,
    getFormConfirmar: getFormConfirmar,
    mostrarConfirmacion: mostrarConfirmacion,
    ocultarConfirmacion: ocultarConfirmacion,
    ID_TEMP_TBL_BODY: ID_TEMP_TBL_BODY,
    formatFecha: formatFecha,
    formatPrecio: formatPrecio
  };
})(); //Handlebars helpers personalizados
//Determina si la propiedad de un objeto es un Id


Handlebars.registerHelper('isId', function (key) {
  return key === 'Id' || key === 'id';
}); //Formatea el código de los diferentes mantenedores

Handlebars.registerHelper('formatoCodigo', function (id, iniFormato, cantNum) {
  var formato = iniFormato;
  var cantCeros = cantNum - id.toString().length;

  for (var i = 0; i < cantCeros; i++) {
    formato += '0';
  }

  formato += id.toString();
  return formato;
}); //Da formato de precio a un número

Handlebars.registerHelper('formatoPrecio', function (precio) {
  return "S/. ".concat(precio.toFixed(2));
}); //Fin de los helpers

window.addEventListener('load', function () {
  $.extend(true, $.fn.dataTable.defaults, {
    "searching": false,
    "ordering": false,
    "lengthChange": false,
    "language": {
      "info": "Mostrando página _PAGE_ de _PAGES_",
      "paginate": {
        "next": "Siguiente",
        "previous": "Anterior"
      }
    }
  });
  $('#general-toast').toast();
});
//# sourceMappingURL=athenasNet.js.map