"use strict";

var InicioUI = function InicioUI() {
  var setCantVenta = function setCantVenta(cantidad) {
    return document.getElementById('txt-cant-venta').innerText = cantidad;
  };

  var setCantProducto = function setCantProducto(cantidad) {
    return document.getElementById('txt-cant-producto').innerText = cantidad;
  };

  var setCantUsuario = function setCantUsuario(cantidad) {
    var txtcantVenta = document.getElementById('txt-cant-usuario');

    if (txtcantVenta) {
      txtcantVenta.innerText = cantidad;
    }
  };

  var setCantCliente = function setCantCliente(cantidad) {
    return document.getElementById('txt-cant-cliente').innerText = cantidad;
  };

  var setPromoData = function setPromoData(data) {
    AthenasNet.compilaTemplate('tempTblPromosActuales', data, '#tb-promocion tbody');
    $('#tb-promocion').DataTable();
  };

  var setProductoData = function setProductoData(data) {
    AthenasNet.compilaTemplate('tempTblProdBajoStock', data, '#tb-producto tbody');
    $('#tb-producto').DataTable();
  };

  var ocultarVendedor = function ocultarVendedor() {
    document.getElementById('info-usuarios').style.display = 'none';
  };

  return {
    setCantUsuario: setCantUsuario,
    setCantProducto: setCantProducto,
    setCantVenta: setCantVenta,
    setCantCliente: setCantCliente,
    setPromoData: setPromoData,
    setProductoData: setProductoData,
    ocultarVendedor: ocultarVendedor
  };
};
//# sourceMappingURL=inicioUI.js.map