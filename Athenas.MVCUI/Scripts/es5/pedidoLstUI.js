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

  var getInputCantidad = function getInputCantidad() {
    return document.getElementById('Producto.Cantidad');
  };

  var getFormPedido = function getFormPedido() {
    return document.getElementById('form-pedido');
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

  var abreModalPedido = function abreModalPedido() {
    $('#modalDetPedido').modal('show');
  };

  var setModalPedidoData = function setModalPedidoData(pedido) {
    AthenasNet.compilaTemplate('tempModalPedidoBody', pedido, '#modalDetPedido .modal-body');
  };

  var setModalPedidoDetData = function setModalPedidoDetData(pedido) {
    AthenasNet.compilaTemplate('tempDetPedidoTbl', pedido, '#modalDetPedido .modal-body #det-body');
  };

  var validaEnvioPedido = function validaEnvioPedido(esValido) {
    if (!esValido) {
      getFormPedido().classList.add('was-validated');
    } else {
      getFormPedido().classList.remove('was-validated');
    }
  };

  var validaProvSeleccionado = function validaProvSeleccionado(esValido) {
    if (!esValido) {
      document.getElementById('Proveedor.RzSocial').classList.add('is-invalid');
    } else {
      document.getElementById('Proveedor.RzSocial').classList.remove('is-invalid');
    }
  };

  var validaProdSeleccionado = function validaProdSeleccionado(esValido) {
    debugger;

    if (!esValido) {
      document.getElementById('Producto.Codigo').classList.add('is-invalid');
    } else {
      document.getElementById('Producto.Codigo').classList.remove('is-invalid');
    }
  };

  var validaCantidadDetalle = function validaCantidadDetalle(esValido) {
    if (!esValido) {
      document.getElementById('Producto.Cantidad').classList.add('is-invalid');
    } else {
      document.getElementById('Producto.Cantidad').classList.remove('is-invalid');
    }
  };

  var validaDetalle = function validaDetalle(esValido) {
    if (!esValido) {
      document.getElementById('msj-error').classList.remove('d-none');
    } else {
      document.getElementById('msj-error').classList.add('d-none');
    }
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
    getBtnAgregarDet: getBtnAgregarDet,
    getTblModalBuscar: getTblModalBuscar,
    getModalContentBuscar: getModalContentBuscar,
    getInputCantidad: getInputCantidad,
    setTotal: setTotal,
    getTblDetalle: getTblDetalle,
    getFormPedido: getFormPedido,
    abreModalPedido: abreModalPedido,
    setModalPedidoData: setModalPedidoData,
    validaEnvioPedido: validaEnvioPedido,
    validaProvSeleccionado: validaProvSeleccionado,
    validaProdSeleccionado: validaProdSeleccionado,
    validaCantidadDetalle: validaCantidadDetalle,
    validaDetalle: validaDetalle
  };
};

window.addEventListener('load', function () {
  var tempDetPedidoTbl = document.getElementById('tempDetPedidoTbl');

  if (tempDetPedidoTbl) {
    Handlebars.registerPartial('tblDetPedido', tempDetPedidoTbl.innerHTML);
  }
});
//# sourceMappingURL=pedidoLstUI.js.map