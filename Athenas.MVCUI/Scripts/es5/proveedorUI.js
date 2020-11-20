"use strict";

var ProveedorUI = function ProveedorUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['RzSocial'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstProveedores) {
    var data = {
      filas: lstProveedores,
      //=> item
      edita: true,
      elimina: true,
      iniCodigo: 'PV'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getProveedor = function getProveedor() {
    return AthenasNet.Mant.getEntidad(['RzSocial', 'Id', 'accion', 'RUC', 'Representante', 'Email', 'Telefono', 'Direccion']);
  };

  return {
    getProveedor: getProveedor,
    generarTabla: generarTabla,
    getFiltros: getFiltros
  };
};
//# sourceMappingURL=proveedorUI.js.map