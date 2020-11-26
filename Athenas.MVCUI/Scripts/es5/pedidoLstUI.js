"use strict";

var PedidoUI = function PedidoUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['RzSocial'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstPedido) {
    var data = {
      filas: lstPedido,
      edita: true,
      elimina: true,
      iniCodigo: 'PED'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  return {
    generarTabla: generarTabla,
    getFiltros: getFiltros
  };
};
//# sourceMappingURL=pedidoLstUI.js.map