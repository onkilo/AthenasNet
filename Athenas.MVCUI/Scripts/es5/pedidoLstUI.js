"use strict";

var PedidoUI = function PedidoUI() {
  //para el listado
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Proveedor'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstPedido) {
    var data = {
      filas: lstPedido,
      edita: false,
      recibe: true,
      elimina: true,
      iniCodigo: 'PED',
      recibirUrl: "".concat(window.location.protocol, "//").concat(window.location.host).concat(window.location.pathname, "/Recibir")
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  }; //para el registro


  var getTblModalBuscar = function getTblModalBuscar() {
    return document.getElementById('tbl-modal-buscar');
  };

  var getModalBuscar = function getModalBuscar() {
    return $('modalBuscar');
  };

  var getBtnBuscarProducto = function getBtnBuscarProducto() {
    return document.getElementById('btn-buscar-producto');
  };

  var getBtnBuscarProveedor = function getBtnBuscarProveedor() {
    return document.getElementById('btn-buscar-proveedor');
  };

  var setProducto = function setProducto(producto) {
    var Id = document.getElementById('Producto.Id');
    var Descripcion = document.getElementById('Producto.Descripcion');
    var PrecioCompra = document.getElementById('Producto.PrecioCompra');
    var StockActual = document.getElementById('Producto.StockActual');
    Id.value = producto.Id;
    Descripcion.value = producto.Descripcion;
    PrecioCompra.value = producto.PrecioCompra;
    StockActual.value = producto.StockActual;
  };

  var setProveedor = function setProveedor(proveedor) {
    var Id = document.getElementById('Proveedor.Id');
    var RzSocial = document.getElementById('Proveedor.RzSocial');
    var Direccion = document.getElementById('Proveedor.Direccion');
    var Telefono = document.getElementById('Proveedor.Telefono');
    Id.value = proveedor.Id;
    RzSocial.value = proveedor.RzSocial;
    Direccion.value = proveedor.Direccion;
    Telefono.value = proveedor.Telefono;
  };

  var setListModalBuscar = function setListModalBuscar(data) {
    AthenasNet.compilaTemplate('tempModalBuscar', data, document.querySelector('#modalBuscar .modal-content'));
  };

  return {
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    getTblModalBuscar: getTblModalBuscar,
    getModalBuscar: getModalBuscar,
    setProducto: setProducto,
    setProveedor: setProveedor,
    setListModalBuscar: setListModalBuscar,
    getBtnBuscarProducto: getBtnBuscarProducto,
    getBtnBuscarProveedor: getBtnBuscarProveedor
  };
};
//# sourceMappingURL=pedidoLstUI.js.map