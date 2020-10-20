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
  var ACCION_MOSTRAR_TOAST = 'mostrar';
  var ACCION_OCULTAR_TOAST = 'ocultar';
  var ID_MAIN_FORM = 'main-form';

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
              //ocultar spinner
              manejaSpinner(ACCION_OCULTAR_SPINNER);
              return _context.finish(13);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 10, 13, 16]]);
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
    var _ref2$className = _ref2.className,
        className = _ref2$className === void 0 ? 'bg-success' : _ref2$className,
        _ref2$mensaje = _ref2.mensaje,
        mensaje = _ref2$mensaje === void 0 ? 'Operación realizada con éxito' : _ref2$mensaje,
        _ref2$titulo = _ref2.titulo,
        titulo = _ref2$titulo === void 0 ? 'Éxito' : _ref2$titulo;
    var TOAST_ID = '#general-toast';
    var TOAST_ID_MSJ = '#toast-mensaje';
    var TOAST_ID_TITULO = '#toast-titulo';
    var toast = document.querySelector(TOAST_ID);
    var toastMsjBody = document.querySelector(TOAST_ID_MSJ);
    var toastMsjTitle = document.querySelector(TOAST_ID_TITULO);
    toastMsjBody.innerHTML = mensaje;
    toastMsjTitle.innerHTML = titulo;
    var classes = ['toast', 'mt-2'];
    classes.push(className);
    toast.className = classes.join(' ');
    $(TOAST_ID).toast('show');
  };

  var compilaTemplate = function compilaTemplate(idTemplate, data, idContenedor) {
    var compilacion = Handlebars.compile(document.getElementById(idTemplate).innerHTML);
    var compConData = compilacion(data);
    document.querySelector(idContenedor).innerHTML = compConData;
  };

  var getMainForm = function getMainForm() {
    return document.getElementById(ID_MAIN_FORM);
  };

  var getFormElements = function getFormElements() {
    return getMainForm().elements;
  };

  var getFormEleValue = function getFormEleValue(ele) {
    return getFormElements()[ele].value;
  };

  var setFormEleValue = function setFormEleValue(ele, value) {
    getFormElements()[ele].value = value;
  };

  var getEntidad = function getEntidad() {
    var arrCampos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var conId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var conAccion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var formElements = getFormElements();
    var entidad = {};
    arrCampos.forEach(function (fil) {
      entidad = _objectSpread(_objectSpread({}, entidad), {}, _defineProperty({}, fil, formElements[fil].value));
    });
    if (conId) entidad.Id = formElements['Id'].value;
    if (conAccion) entidad.accion = formElements['accion'].value;
    return entidad;
  };

  var setEntidad = function setEntidad() {
    var entidad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var formElements = getFormElements();
    Object.keys(entidad).forEach(function (key) {
      formElements[key].value = entidad[key];
    });
  };

  var limpiarMainForm = function limpiarMainForm() {
    var resetId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var resetAccion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'registrar';
    getMainForm().reset();
    setFormEleValue('Id', resetId);
    setFormEleValue('accion', resetAccion);
  };

  var cerrarModalMainform = function cerrarModalMainform() {
    $('#modal-main-form').modal('hide');
  };

  window.AthenasNet = {
    llamadaApi: llamadaApi,
    manejaSpinner: manejaSpinner,
    muestraToast: muestraToast,
    compilaTemplate: compilaTemplate,
    getEntidad: getEntidad,
    getFormEleValue: getFormEleValue,
    setFormEleValue: setFormEleValue,
    limpiarMainForm: limpiarMainForm,
    cerrarModalMainform: cerrarModalMainform,
    setEntidad: setEntidad
  };
})();

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