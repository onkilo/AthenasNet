"use strict";

var InicioUI = function InicioUI() {
  var setCantidades = function setCantidades() {
    var objCantidades = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    document.getElementById('txt-cant-producto').innerText = objCantidades.CantProdcutos;
    document.getElementById('txt-cant-cliente').innerText = objCantidades.CantClientes;
    document.getElementById('txt-cant-venta').innerText = objCantidades.CantVentas;
    document.getElementById('txt-cant-usuario').innerText = objCantidades.CantUsuarios;
  };

  var setPromoActualData = function setPromoActualData(data) {
    AthenasNet.compilaTemplate('tempPromoActual', data, '#tb-promocion > tbody');
    $('#tb-promocion').DataTable();
  };

  var setProdBajoStockData = function setProdBajoStockData(data) {
    AthenasNet.compilaTemplate('tempProdBajoStock', data, '#tb-producto > tbody');
    $('#tb-producto').DataTable();
  };

  return {
    setCantidades: setCantidades,
    setProdBajoStockData: setProdBajoStockData,
    setPromoActualData: setPromoActualData
  };
};
//# sourceMappingURL=inicioUI.js.map