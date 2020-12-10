"use strict";

var VentaUI = function VentaUI() {
  //Para el listado
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Cliente'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstVentas) {
    var data = {
      filas: lstVentas,
      elimina: true,
      iniCodigo: 'VEN'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getBtnAgregarDet = function getBtnAgregarDet() {
    return document.getElementById('btn-agregar-detalle');
  };

  var getModalBuscar = function getModalBuscar() {
    return $('#modalBuscar');
  };

  var setModalBuscarData = function setModalBuscarData(data) {
    AthenasNet.compilaTemplate('tempModalBuscar', data, '#modalBuscar .modal-content');
  };

  var setDetalleData = function setDetalleData(data) {
    AthenasNet.compilaTemplate('tempDetalle', data, '#tb-detalle #det-body');
  };

  return {
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    getModalBuscar: getModalBuscar,
    setModalBuscarData: setModalBuscarData,
    setDetalleData: setDetalleData,
    getBtnAgregarDet: getBtnAgregarDet
  };
};
//# sourceMappingURL=ventaLstUI.js.map