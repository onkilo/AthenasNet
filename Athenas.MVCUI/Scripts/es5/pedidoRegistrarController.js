"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PedidoController = function PedidoController(service, ui, proveedorService, productoService) {
  var lstProductos = [];
  var lstProveedores = [];
  var tipoBusqueda = null; //Producto, Proveedor

  var muestraProductos = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return productoService.listar({});

            case 2:
              lstProductos = _context.sent;
              console.log(lstProductos);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function muestraProductos() {
      return _ref.apply(this, arguments);
    };
  }();

  var muestraProveedores = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return proveedorService.listarProveedor({});

            case 2:
              lstProveedores = _context2.sent;
              console.log(lstProveedores);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function muestraProveedores() {
      return _ref2.apply(this, arguments);
    };
  }();

  var evtBtnBuscarProducto = function evtBtnBuscarProducto() {
    return ui.getBtnBuscarProducto().addEventListener('click', function () {
      return tipoBusqueda = 'Producto';
    });
  };

  var evtBtnBuscarProveedor = function evtBtnBuscarProveedor() {
    return ui.getBtnBuscarProveedor().addEventListener('click', function () {
      return tipoBusqueda = 'Proveedor';
    });
  };

  var evtAbreModal = function evtAbreModal() {
    ui.getModalBuscar().on('show.bs.modal', function (e) {
      if (tipoBusqueda === 'Producto') muestraProductos();else muestraProveedores();
    });
  };

  var iniciar = function iniciar() {
    evtBtnBuscarProducto();
    evtBtnBuscarProveedor();
    evtAbreModal();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=pedidoRegistrarController.js.map