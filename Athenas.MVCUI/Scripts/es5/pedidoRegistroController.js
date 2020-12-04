"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PedidoController = function PedidoController(service, ui, proveedorService, productoService) {
  var tipoBusqueda = null;
  var lstDetalles = [];
  var provSelecionado = {};
  var prodSelecionado = {};
  var lstProveedores = [];
  var lstProductos = [];

  var evtMostrarModalBuscar = function evtMostrarModalBuscar() {
    ui.getModalBuscar().on('show.bs.modal', function (e) {
      console.log("abriendo");
      if (tipoBusqueda === 'Proveedor') muestraProveedores();else muestraProductos();
    });
  };

  var evtBtnBuscarProducto = function evtBtnBuscarProducto() {
    ui.getBtnBuscarProducto().addEventListener('click', function () {
      return tipoBusqueda = 'Producto';
    });
  };

  var evtBtnBuscarProveedor = function evtBtnBuscarProveedor() {
    console.log(ui.getBtnBuscarProveedor());
    ui.getBtnBuscarProveedor().addEventListener('click', function () {
      tipoBusqueda = 'Proveedor';
    });
  };

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
              console.log(lstProductos);
              data = {
                titulo: 'Buscar Producto',
                cabecera: ['Descripción', 'Precio', 'Stock', 'Categoría', 'Acciones'],
                columnas: lstProductos.map(function (p) {
                  return {
                    data: {
                      Descripcion: p.Descripcion,
                      Precio: p.PrecioCompra,
                      Stock: p.StockActual,
                      Categoria: p.Categoria.Descripcion
                    },
                    Id: p.Id
                  };
                })
              };
              ui.setModalBuscarData(data);
              evtTblBuscar();

            case 7:
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
              console.log(lstProveedores);
              data = {
                titulo: 'Buscar Proveedor',
                cabecera: ['Razón Social', 'Representante', 'Dirección', 'Teléfono', 'Acciones'],
                columnas: lstProveedores.map(function (p) {
                  return {
                    data: {
                      RzSocial: p.RzSocial,
                      Representante: p.Representante,
                      Direccion: p.Direccion,
                      Telefono: p.Telefono
                    },
                    Id: p.Id
                  };
                })
              };
              ui.setModalBuscarData(data);
              evtTblBuscar();

            case 7:
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

  var evtTblBuscar = function evtTblBuscar() {
    ui.getTblModalBuscar().addEventListener('click', function (e) {
      if (e.target.dataset.seleccionId) {
        var id = e.target.dataset.seleccionId;

        if (tipoBusqueda === 'Proveedor') {
          provSelecionado = lstProveedores.find(function (p) {
            return p.Id === parseInt(id);
          });
          ui.setProveedor(provSelecionado);
        } else {
          prodSelecionado = lstProductos.find(function (p) {
            return p.Id === parseInt(id);
          });
          ui.setProducto(_objectSpread(_objectSpread({}, prodSelecionado), {}, {
            Codigo: AthenasNet.formatId(prodSelecionado.Id, 'PRD', 4),
            PrecioCompra: AthenasNet.formatPrecio(prodSelecionado.PrecioCompra)
          }));
        }

        ui.getModalBuscar().modal('hide'); //$('#modalBuscar').modal('hide');
      }
    });
  };

  var evtBtnAgregarDet = function evtBtnAgregarDet() {
    ui.getBtnAgregarDet().addEventListener('click', function () {
      var cantidad = document.getElementById('Producto.Cantidad').value;
      var encontrado = false; //lstDetalles.forEach(det => {
      //    if (det.Producto.Id === prodSelecionado.Id) {
      //        det.Cantidad = cantidad;
      //        encontrado = true;
      //        break;
      //    }
      //})

      for (var i = 0; i < lstDetalles.length; i++) {
        if (lstDetalles[i].Producto.Id === prodSelecionado.Id) {
          lstDetalles[i].Cantidad = cantidad;
          encontrado = true;
          break;
        }
      }

      if (!encontrado) {
        lstDetalles.push({
          Producto: _objectSpread({}, prodSelecionado),
          Cantidad: cantidad,
          Precio: prodSelecionado.PrecioCompra
        });
      }

      console.log(lstDetalles);
      ui.setDetallesData({
        filas: lstDetalles.map(function (det) {
          return {
            Codigo: AthenasNet.formatId(det.Producto.Id, 'PRD', 4),
            Descripcion: det.Producto.Descripcion,
            Cantidad: det.Cantidad,
            Precio: AthenasNet.formatPrecio(det.Precio),
            SubTotal: AthenasNet.formatPrecio(det.Cantidad * det.Precio),
            Id: det.Producto.Id
          };
        })
      });
      mostrarTotal();
    });
  };

  var mostrarTotal = function mostrarTotal() {
    var total = 0;
    lstDetalles.forEach(function (det) {
      total += det.Precio * det.Cantidad;
    });
    document.getElementById('total').value = total.toFixed(2);
  };

  var evtEnvioPedido = function evtEnvioPedido() {
    ui.getFormPedido().addEventListener('submit', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
        var pedido;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e.preventDefault();
                pedido = {
                  Trabajador: {
                    Id: 8
                  },
                  Proveedor: {
                    Id: provSelecionado.Id
                  },
                  Detalles: lstDetalles
                };
                _context3.prev = 2;
                _context3.next = 5;
                return service.crear(pedido);

              case 5:
                AthenasNet.muestraToast({
                  cssClass: 'bg-success',
                  mensaje: 'El pedido se registró correctamente',
                  titulo: 'Éxito'
                });
                _context3.next = 12;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);
                console.error(_context3.t0);
                AthenasNet.muestraToast({
                  cssClass: 'bg-danger',
                  mensaje: 'Hubo un error al registrar el pedido',
                  titulo: 'Error'
                });

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 8]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
  };

  var iniciar = function iniciar() {
    evtMostrarModalBuscar();
    evtBtnBuscarProducto();
    evtBtnBuscarProveedor();
    evtBtnAgregarDet();
    evtEnvioPedido();
  };

  return {
    iniciar: iniciar
  };
};
//# sourceMappingURL=pedidoRegistroController.js.map