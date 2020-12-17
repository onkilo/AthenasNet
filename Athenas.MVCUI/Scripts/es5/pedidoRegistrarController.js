"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PedidoController = function PedidoController(service, ui, proveedorService, productoService) {
  var lstProductos = [];
  var lstProveedores = [];
  var tipoBusqueda = null; //Producto, Proveedor

  var lstDetalles = [];
  var prodSeleccionado = {};
  var provSeleccionado = {};

  var muestraProductos = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return productoService.listar({});

            case 2:
              lstProductos = _context.sent;
              data = {
                titulo: 'Buscar Producto',
                cabecera: ['Descripción', 'Precio', 'Stock', 'Categoría', 'Acciones'],
                filas: lstProductos.map(function (prod) {
                  return {
                    data: {
                      Descripcion: prod.Descripcion,
                      Precio: AthenasNet.formatPrecio(prod.PrecioCompra),
                      Stock: prod.StockActual,
                      Categoria: prod.Categoria.Descripcion
                    },
                    Id: prod.Id
                  };
                })
              };
              ui.setModalBuscarData(data);
              console.log(lstProductos);

            case 6:
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
      var data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return proveedorService.listarProveedor({});

            case 2:
              lstProveedores = _context2.sent;
              data = {
                titulo: 'Buscar Proveedor',
                cabecera: ['Razón Social', 'Representante', 'Dirección', 'Teléfono', 'Acciones'],
                filas: lstProveedores.map(function (prov) {
                  return {
                    data: {
                      RzSocial: prov.RzSocial,
                      Representante: prov.Representante,
                      Direccion: prov.Direccion,
                      Telefono: prov.Telefono
                    },
                    Id: prov.Id
                  };
                })
              };
              ui.setModalBuscarData(data);
              console.log(lstProveedores);

            case 6:
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
  }; //const evtAbreModal = () => {
  //    ui.getModalBuscar().on('show.bs.modal', async (e) => {
  //        if (tipoBusqueda === 'Producto') await muestraProductos();
  //        else await muestraProveedores();
  //        evtBtnSelModalBuscar();
  //    })
  //}


  var evtAbreModal = function evtAbreModal() {
    ui.getModalBuscar().on('show.bs.modal', function (e) {
      if (tipoBusqueda === 'Producto') muestraProductos();else muestraProveedores();
    });
  };

  var evtBtnSelModalBuscar = function evtBtnSelModalBuscar() {
    ui.getModalContentBuscar().addEventListener('click', function (e) {
      if (e.target.dataset.seleccionId) {
        console.log('click de seleccion');
        var id = parseInt(e.target.dataset.seleccionId);

        if (tipoBusqueda === 'Producto') {
          prodSeleccionado = lstProductos.find(function (prod) {
            return prod.Id === id;
          });
          ui.setProducto(_objectSpread(_objectSpread({}, prodSeleccionado), {}, {
            PrecioCompra: AthenasNet.formatPrecio(prodSeleccionado.PrecioCompra),
            Codigo: AthenasNet.formatCodigo(prodSeleccionado.Id, 'PRD', 4)
          }));
          ui.getModalBuscar().modal('hide');
        } else {
          provSeleccionado = lstProveedores.find(function (prov) {
            return prov.Id === id;
          });
          ui.setProveedor(provSeleccionado);
          ui.getModalBuscar().modal('hide');
        }
      }
    });
  };

  var evtBtnAgregarDet = function evtBtnAgregarDet() {
    ui.getBtnAgregarDet().addEventListener('click', function () {
      var cantidad = ui.getInputCantidad().value;
      var encontrado = false;

      for (var i = 0; i < lstDetalles.length; i++) {
        if (prodSeleccionado.Id === lstDetalles[i].Producto.Id) {
          lstDetalles[i].Cantidad = parseInt(cantidad);
          encontrado = true;
          break;
        }
      }

      if (!encontrado) {
        lstDetalles.push({
          Producto: {
            Id: prodSeleccionado.Id,
            Descripcion: prodSeleccionado.Descripcion
          },
          Cantidad: parseInt(cantidad),
          Precio: prodSeleccionado.PrecioCompra
        });
      }

      muestraDetalle();
    });
  };

  var evtEliminaDetalle = function evtEliminaDetalle() {
    ui.getTblDetalle().addEventListener('click', function (e) {
      if (e.target.dataset.productoId) {
        var id = parseInt(e.target.dataset.productoId);
        lstDetalles = lstDetalles.filter(function (det) {
          return det.Producto.Id !== id;
        });
        muestraDetalle();
      }
    });
  };

  var muestraDetalle = function muestraDetalle() {
    var total = 0;
    var data = {
      filas: lstDetalles.map(function (det) {
        total += parseInt(det.Cantidad) * det.Precio;
        return {
          data: {
            Codigo: AthenasNet.formatCodigo(det.Producto.Id, 'PRD', 4),
            Descripcion: det.Producto.Descripcion,
            Precio: AthenasNet.formatPrecio(det.Precio),
            Cantidad: det.Cantidad,
            SubTotal: AthenasNet.formatPrecio(det.Precio * det.Cantidad)
          },
          productoId: det.Producto.Id
        };
      })
    };
    ui.setDetalleData(data);
    ui.setTotal(total.toFixed(2));
  };

  var evtFormPedido = function evtFormPedido() {
    ui.getFormPedido().addEventListener('submit', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
        var pedido, mensaje;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e.preventDefault();
                pedido = {
                  Proveedor: {
                    Id: provSeleccionado.Id
                  },
                  Detalles: lstDetalles
                };
                _context3.prev = 2;
                _context3.next = 5;
                return service.crear(pedido);

              case 5:
                mensaje = {
                  color: 'bg-success',
                  titulo: 'Registro exitoso',
                  texto: 'El pedido fue registrado exitosamente'
                };
                localStorage.setItem('mensaje', JSON.stringify(mensaje));
                window.location.href = AthenasNet.MVC_URL_BASE + 'Pedido';
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                console.error(_context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 10]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
  };

  var iniciar = function iniciar() {
    evtBtnBuscarProducto();
    evtBtnBuscarProveedor();
    evtAbreModal();
    evtBtnSelModalBuscar();
    evtBtnAgregarDet();
    evtEliminaDetalle();
    evtFormPedido();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=pedidoRegistrarController.js.map