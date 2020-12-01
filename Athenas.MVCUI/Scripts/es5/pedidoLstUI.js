"use strict";

var PedidoUI = function PedidoUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Proveedor'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstPedido) {
    console.log(lstPedido);
    var data = {
      filas: lstPedido,
      edita: false,
      recibe: true,
      elimina: true,
      iniCodigo: 'PED',
      recibirUrl: "".concat(window.location.host).concat(window.location.pathname, "/Recibir")
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