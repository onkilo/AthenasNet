"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var SELTBLCATEGORIA = '#tb-categoria';
  var SELBTNNUEVO = '#btn-nuevo';
  var IDFORMCATEGORIA = 'form-categoria';
  var SELTBLBODY = '#tb-categoria tbody';
  var SELMODALCATE = '#modal-categoria';
  var IDFORMFILTRAR = 'form-filtrar';

  var getTblCrud = function getTblCrud() {
    return document.querySelector(SELTBLCATEGORIA);
  };

  var getBtnNuevo = function getBtnNuevo() {
    return document.querySelector(SELBTNNUEVO);
  };

  var getFormCrud = function getFormCrud() {
    return document.getElementById(IDFORMCATEGORIA);
  };

  var getFormCrudElements = function getFormCrudElements() {
    return getFormCrud().elements;
  };

  var getFormEleValue = function getFormEleValue(ele) {
    return getFormCrudElements()[ele].value;
  };

  var setFormEleValue = function setFormEleValue(ele, value) {
    getFormCrudElements()[ele].value = value;
  };

  var getFormFiltrar = function getFormFiltrar() {
    return document.getElementById(IDFORMFILTRAR);
  };

  var getFiltros = function getFiltros(arrFiltros) {
    var elementosFormulario = getFormFiltrar().elements;
    var filtros = {};
    arrFiltros.forEach(function (fil) {
      filtros = _objectSpread(_objectSpread({}, filtros), {}, _defineProperty({}, fil, elementosFormulario[fil].value));
    });
    return filtros;
  };

  var generarTabla = function generarTabla(filas) {
    AthenasNet.compilaTemplate('temp-tbl-body', {
      filas: filas
    }, SELTBLBODY);
    $(SELTBLCATEGORIA).DataTable();
  };

  var setFormCrud = function setFormCrud(entidad, arrFormEle) {
    $(SELMODALCATE).modal('show');
  };

  var evtMostrarModCategoria = function evtMostrarModCategoria(evt) {
    $(SELMODALCATE).on('hide.bs.modal', function () {
      limpiarForm();
    });
  };

  var cerrarModCate = function cerrarModCate() {
    $(SELMODALCATE).modal('hide');
  };

  var limpiarModalCat = function limpiarModalCat() {
    setFormEleValue('Descripcion', '');
    setFormEleValue('Id', '0');
    setFormEleValue('accion', 'registrar');
  };

  var getCategoria = function getCategoria() {
    var categoria = {
      Descripcion: getFormEleValue('Descripcion'),
      Id: parseInt(getFormEleValue('Id')),
      accion: getFormEleValue('accion')
    };
    return categoria;
  };

  var limpiarForm = function limpiarForm() {
    var elementosFormulario = getFormCrudElements(); //const arrFiltros = ['Descripcion'];
    //arrFiltros.forEach(fil => {
    //    elementosFormulario[fil].value = '';
    //})

    getFormCrud().reset();
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

  window.AthenasNet = _objectSpread({}, window.AthenasNet);
})();
//# sourceMappingURL=athenasCrud.js.map