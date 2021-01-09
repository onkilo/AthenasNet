"use strict";

var VentaUI = function VentaUI() {
  //Para el listado
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Cliente'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstVentas) {
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();
    var data = {
      filas: lstVentas,
      elimina: true,
      iniCodigo: 'VEN'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  }; //Para el registro


  var setCliente = function setCliente(cliente) {
    var inNombre = document.getElementById('Cliente.Nombre');
    var inDni = document.getElementById('Cliente.Dni');
    var inTelefono = document.getElementById('Cliente.Telefono');
    inNombre.value = cliente.Nombre;
    inDni.value = cliente.Dni;
    inTelefono.value = cliente.Telefono;
  };

  var setProducto = function setProducto(producto) {
    var inCodigo = document.getElementById('Producto.Codigo');
    var inDescripcion = document.getElementById('Producto.Descripcion');
    var inPrecio = document.getElementById('Producto.PrecioVenta');
    var inStock = document.getElementById('Producto.StockActual');
    var inDesc = document.getElementById('Producto.Descuento');
    inCodigo.value = producto.Codigo;
    inDescripcion.value = producto.Descripcion;
    inPrecio.value = producto.PrecioVenta;
    inStock.value = producto.StockActual;
    inDesc.value = producto.Descuento;
  };

  var getBtnBuscarCliente = function getBtnBuscarCliente() {
    return document.getElementById('btn-buscar-cliente');
  };

  var getBtnBuscarProducto = function getBtnBuscarProducto() {
    return document.getElementById('btn-buscar-producto');
  };

  var getBtnAgregarDet = function getBtnAgregarDet() {
    return document.getElementById('btn-agregar-detalle');
  };

  var getInputCantidad = function getInputCantidad() {
    return document.getElementById('Producto.Cantidad');
  };

  var getFormVenta = function getFormVenta() {
    return document.getElementById('form-venta');
  };

  var setSubTotal = function setSubTotal(subtotal) {
    return document.getElementById('txt-subtotal').value = subtotal;
  };

  var setDescuento = function setDescuento(descuento) {
    return document.getElementById('txt-descuento').value = descuento;
  };

  var setTotal = function setTotal(total) {
    return document.getElementById('txt-total').value = total;
  };

  var getModalBuscar = function getModalBuscar() {
    return $('#modalBuscar');
  };

  var getModalContentBuscar = function getModalContentBuscar() {
    return document.querySelector('#modalBuscar .modal-content');
  };

  var getTblModalBuscar = function getTblModalBuscar() {
    return document.getElementById('tbl-modal-buscar');
  };

  var getTblDetalle = function getTblDetalle() {
    return document.getElementById('tb-detalle');
  };

  var setModalBuscarData = function setModalBuscarData(data) {
    AthenasNet.compilaTemplate('tempModalBuscar', data, '#modalBuscar .modal-content');
  };

  var setDetalleData = function setDetalleData(data) {
    AthenasNet.compilaTemplate('tempDetalle', data, '#tb-detalle #det-body');
  };

  var abreModalVenta = function abreModalVenta() {
    $('#modalDetVenta').modal('show');
  };

  var setModalVentaData = function setModalVentaData(venta) {
    AthenasNet.compilaTemplate('tempModalVentaBody', venta, '#modalDetVenta .modal-body');
  };

  var setModalVentaDetData = function setModalVentaDetData(venta) {
    AthenasNet.compilaTemplate('tempDetVentaTbl', venta, '#modalDetVenta .modal-body #det-body');
  };

  return {
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    setCliente: setCliente,
    setProducto: setProducto,
    getBtnBuscarCliente: getBtnBuscarCliente,
    getBtnBuscarProducto: getBtnBuscarProducto,
    getModalBuscar: getModalBuscar,
    setModalBuscarData: setModalBuscarData,
    setDetalleData: setDetalleData,
    getBtnAgregarDet: getBtnAgregarDet,
    getTblModalBuscar: getTblModalBuscar,
    getModalContentBuscar: getModalContentBuscar,
    getInputCantidad: getInputCantidad,
    setSubTotal: setSubTotal,
    setDescuento: setDescuento,
    setTotal: setTotal,
    getTblDetalle: getTblDetalle,
    getFormVenta: getFormVenta,
    abreModalVenta: abreModalVenta,
    setModalVentaData: setModalVentaData
  };
};

window.addEventListener('load', function () {
  Handlebars.registerPartial('tblDetVenta', document.getElementById('tempDetVentaTbl').innerHTML);
});
//# sourceMappingURL=ventaLstUI.js.map