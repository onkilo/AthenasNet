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


  var setProveedor = function setProveedor(proveedor) {
    var inRzSocial = document.getElementById('Proveedor.RzSocial');
    var inDireccion = document.getElementById('Proveedor.Direccion');
    var inTelefono = document.getElementById('Proveedor.Telefono');
    inRzSocial.value = proveedor.RzSocial;
    inDireccion.value = proveedor.Direccion;
    inTelefono.value = proveedor.Telefono;
  };

  var setProducto = function setProducto(producto) {
    var inCodigo = document.getElementById('Producto.Codigo');
    var inDescripcion = document.getElementById('Producto.Descripcion');
    var inPrecio = document.getElementById('Producto.PrecioCompra');
    var inStock = document.getElementById('Producto.StockActual');
    inCodigo.value = producto.Codigo;
    inDescripcion.value = producto.Descripcion;
    inPrecio.value = producto.PrecioCompra;
    inStock.value = producto.StockActual;
  };

  var getBtnBuscarProveedor = function getBtnBuscarProveedor() {
    return document.getElementById('btn-buscar-proveedor');
  };

  var getBtnBuscarProducto = function getBtnBuscarProducto() {
    return document.getElementById('btn-buscar-producto');
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
    getBtnPostRecibir: getBtnPostRecibir,
    setProveedor: setProveedor,
    setProducto: setProducto,
    getBtnBuscarProveedor: getBtnBuscarProveedor,
    getBtnBuscarProducto: getBtnBuscarProducto,
    getModalBuscar: getModalBuscar,
    setModalBuscarData: setModalBuscarData,
    setDetalleData: setDetalleData,
    getBtnAgregarDet: getBtnAgregarDet
  };
};
//# sourceMappingURL=pedidoLstUI.js.map