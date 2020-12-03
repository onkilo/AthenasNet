"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var PedidoController = function PedidoController(service, ui, proveedorService, productoService) {
  var tipoBusqueda = null;

  var evtMostrarModalBuscar = function evtMostrarModalBuscar() {
    ui.getModalBuscar().on('show.bs.modal', function (e) {
      if (tipoBusqueda === 'Proveedor') muestraProveedores();else muestraProductos();
    });
  };

  var evtBtnBuscarProducto = function evtBtnBuscarProducto() {
    ui.getBtnBuscarProducto().addEventListener('click', function () {
      return tipoBusqueda = (_readOnlyError("tipoBusqueda"), 'Producto');
    });
  };

  var evtBtnBuscarProveedor = function evtBtnBuscarProveedor() {
    ui.getBtnBuscarProveedor().addEventListener('click', function () {
      return tipoBusqueda = (_readOnlyError("tipoBusqueda"), 'Proveedor');
    });
  };

  var muestraProductos = function muestraProductos() {};

  var muestraProveedores = function muestraProveedores() {};

  var iniciar = function iniciar() {
    evtMostrarModalBuscar();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=pedidoRegistroController.js.map