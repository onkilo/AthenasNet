"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UsuarioUI = function UsuarioUI() {
  var ID_FORM_CUENTA = 'form-usuario';

  var getFormCuenta = function getFormCuenta() {
    return document.getElementById(ID_FORM_CUENTA);
  };

  var setFormCuenta = function setFormCuenta(entidad) {
    var arrExcepciones = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var elementos = getFormCuenta().elements;
    elementos.forEach(function (ele) {
      if (arrExcepciones.includes(ele)) return;
      ele.value = entidad[ële];
    });
  };

  var getCuenta = function getCuenta() {
    var elementosFormulario = getFormCuenta().elements;
    var arrEle = ['Nombre', 'Apellido', 'Dni', 'Sexo', 'Direccion', 'Email', 'Usuario', 'Contrasenia', 'Telefono'];
    var cuenta = {};
    arrEle.forEach(function (ele) {
      cuenta = _objectSpread(_objectSpread({}, cuenta), {}, _defineProperty({}, ele, elementosFormulario[ele].value));
    });
    return cuenta;
  };

  return {
    getFormCuenta: getFormCuenta,
    setFormCuenta: setFormCuenta,
    getCuenta: getCuenta
  };
};
//# sourceMappingURL=usuarioCuentaUI.js.map