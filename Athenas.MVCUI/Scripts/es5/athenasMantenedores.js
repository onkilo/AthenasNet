"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var ID_FORM_FILTRAR = 'form-filtrar';
  var SEL_BTN_NUEVO = '#btn-nuevo';
  var SEL_TBL_MANT = '#tb-mantenedor';
  var SEL_TBL_BODY = '#tb-mantenedor tbody';
  var ID_FORM_CATEGORIA = 'form-mantenedor';
  var SEL_MODAL_CATE = '#modal-mantenedor';

  var getTblMantenedor = function getTblMantenedor() {
    return document.querySelector(SEL_TBL_MANT);
  };

  var getBtnNuevo = function getBtnNuevo() {
    return document.querySelector(SEL_BTN_NUEVO);
  };

  var getFormFiltrar = function getFormFiltrar() {
    return document.getElementById(ID_FORM_FILTRAR);
  };

  var getFiltros = function getFiltros(arrFiltros) {
    var elementosFormulario = getFormFiltrar().elements;
    var filtros = {};
    arrFiltros.forEach(function (fil) {
      filtros = _objectSpread(_objectSpread({}, filtros), {}, _defineProperty({}, fil, elementosFormulario[fil].value));
    });
    return filtros;
  };

  var getFormMantenedor = function getFormMantenedor() {
    return document.getElementById(ID_FORM_CATEGORIA);
  };

  var getFormMantElements = function getFormMantElements() {
    return getFormMantenedor().elements;
  };

  var getFormEleValue = function getFormEleValue(ele) {
    return getFormMantElements()[ele].value;
  };

  var setFormEleValue = function setFormEleValue(ele, value) {
    getFormMantElements()[ele].value = value;
  };

  var setFormMantenedor = function setFormMantenedor(entidad) {
    var elementos = Object.keys(entidad);
    elementos.forEach(function (ele) {
      setFormEleValue(ele, entidad[ele]);
    });
    $(SEL_MODAL_CATE).modal('show');
  };

  var evtMostrarModMant = function evtMostrarModMant(evt) {
    $(SEL_MODAL_CATE).on('hide.bs.modal', function () {
      limpiarFormMant();
    });
  };

  var cerrarModMant = function cerrarModMant() {
    $(SEL_MODAL_CATE).modal('hide');
  };

  var getEntidad = function getEntidad(arrEle) {
    var elementosFormulario = getFormMantElements();
    var entidad = {};
    arrEle.forEach(function (ele) {
      entidad = _objectSpread(_objectSpread({}, entidad), {}, _defineProperty({}, ele, elementosFormulario[ele].value));
    });
    return entidad;
  };

  var limpiarFormMant = function limpiarFormMant() {
    var elementosFormulario = getFormMantElements();
    getFormMantenedor().reset();
    var _elementosFormulario$ = elementosFormulario.Id,
        Id = _elementosFormulario$ === void 0 ? null : _elementosFormulario$,
        _elementosFormulario$2 = elementosFormulario.accion,
        accion = _elementosFormulario$2 === void 0 ? null : _elementosFormulario$2;

    if (Id) {
      elementosFormulario['Id'].value = '0';
    }

    if (accion) {
      elementosFormulario['accion'].value = 'registrar';
    }
  };

  window.AthenasNet.Mant = {
    getFormFiltrar: getFormFiltrar,
    getFiltros: getFiltros,
    getTblMantenedor: getTblMantenedor,
    getBtnNuevo: getBtnNuevo,
    getFormEleValue: getFormEleValue,
    setFormMantenedor: setFormMantenedor,
    evtMostrarModMant: evtMostrarModMant,
    cerrarModMant: cerrarModMant,
    getEntidad: getEntidad,
    getFormMantenedor: getFormMantenedor,
    SEL_TBL_BODY: SEL_TBL_BODY,
    SEL_TBL_MANT: SEL_TBL_MANT
  };
})();
//# sourceMappingURL=athenasMantenedores.js.map