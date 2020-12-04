"use strict";

var PedidoUI = function PedidoUI() {
  //Para el listado
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Proveedor'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstPedidos) {
    var data = {
      filas: lstPedidos,
      elimina: true,
      recibe: true,
      iniCodigo: 'PED',
      urlRecibir: AthenasNet.MVC_URL_BASE + 'Pedido/Recibir'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  }; //Para recibir el pedido


  var getBtnPostRecibir = function getBtnPostRecibir() {
    return document.getElementById('btn-pedido-recibir');
  }; //Para el registro


  return {
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    getBtnPostRecibir: getBtnPostRecibir
  };
};
//# sourceMappingURL=pedidoLstUI.js.map