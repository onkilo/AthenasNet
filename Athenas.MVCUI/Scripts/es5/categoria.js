"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var categorias = [];

var CategoriaService = function CategoriaService() {
  var crearCategoria = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(categoria) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(categoria),
                url: 'Categoria/Crear'
              });

            case 2:
              respuesta = _context.sent;
              return _context.abrupt("return", respuesta);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function crearCategoria(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var actualizarCategoria = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(categoria) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return AthenasNet.llamadaApi({
                type: 'POST',
                data: JSON.stringify(categoria),
                url: 'Categoria/Actualizar'
              });

            case 2:
              respuesta = _context2.sent;
              return _context2.abrupt("return", respuesta);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function actualizarCategoria(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var listarCategoria = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(filtros) {
      var filtrosDefecto, respuesta;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              filtrosDefecto = _objectSpread({
                Descripcion: ''
              }, filtros);
              _context3.next = 3;
              return AthenasNet.llamadaApi({
                data: filtrosDefecto,
                url: 'Categoria/Listar'
              });

            case 3:
              respuesta = _context3.sent;
              return _context3.abrupt("return", respuesta.Data);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function listarCategoria(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var buscarCategoria = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return AthenasNet.llamadaApi({
                data: {
                  Id: id
                },
                url: 'Categoria/Obtener'
              });

            case 2:
              respuesta = _context4.sent;
              return _context4.abrupt("return", respuesta.Data);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function buscarCategoria(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var eliminarCategoria = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var respuesta;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return AthenasNet.llamadaApi({
                data: {
                  Id: id
                },
                url: 'Categoria/Eliminar'
              });

            case 2:
              respuesta = _context5.sent;
              return _context5.abrupt("return", respuesta);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function eliminarCategoria(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    crearCategoria: crearCategoria,
    actualizarCategoria: actualizarCategoria,
    listarCategoria: listarCategoria,
    buscarCategoria: buscarCategoria,
    eliminarCategoria: eliminarCategoria
  };
};

var CategoriaUI = function CategoriaUI() {
  var IDFORMCATEGORIA = 'form-categoria';
  var IDFORMCONFIRMACION = 'form-confirmar';
  var TBLBODYSELECTOR = '#tb-categoria tbody';
  var BTNNUEVOSELECTOR = '#btn-nuevo';
  var TBLCATESELECTOR = '#tb-categoria';
  var MODALCATEGORIA = $('#modal-categoria');

  var formCategoria = function formCategoria() {
    return document.getElementById(IDFORMCATEGORIA);
  };

  var formConfirmacion = function formConfirmacion() {
    return document.getElementById(IDFORMCONFIRMACION);
  };

  var formCategoriaElements = function formCategoriaElements() {
    return formCategoria().elements;
  };

  var getFormElement = function getFormElement(ele) {
    return formCategoriaElements()[ele].value;
  };

  var setFormElement = function setFormElement(ele, value) {
    return formCategoriaElements()[ele].value = value;
  };

  var getTablaCate = function getTablaCate() {
    return document.querySelector(TBLCATESELECTOR);
  };

  var getBtnNuevo = function getBtnNuevo() {
    return document.querySelector(BTNNUEVOSELECTOR);
  };

  var generarFila = function generarFila(categoria) {
    var template = "\n            <tr>\n                <td>".concat(categoria.Id, "</td>\n                <td>").concat(categoria.Descripcion, "</td>\n                <td>\n                    <button type=\"button\" class=\"btn btn-success btn-sm btn-sin-click\" data-id=\"").concat(categoria.Id, "\" data-accion=\"editar\">\n                        <i class=\"fas fa-edit\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-success btn-sm btn-sin-click\" data-id=\"").concat(categoria.Id, "\" data-accion=\"eliminar\">\n                        <i class=\"fas fa-trash-alt\" data-del-action=\"true\"></i>\n                    </button>\n                </td>\n            </tr>\n        ");
    return template;
  };

  var generarTabla = function generarTabla(categorias) {
    var tBody = document.querySelector(TBLBODYSELECTOR);
    var tableBody = "";
    lstCategorias.forEach(function (cat) {
      tableBody += generarFila(cat);
    });
    tBody.innerHTML = tableBody;
  };

  var getCategoria = function getCategoria() {
    var categoria = {
      Descripcion: getFormElement('txt-descripcion'),
      Id: getFormElement('hdn-id'),
      accion: getFormElement('accion')
    };
    return categoria;
  };

  var limpiaFormulario = function limpiaFormulario() {
    setFormElement('txt-descripcion', '');
    setFormElement('hdn-id', 0);
    setFormElement('accion', 'registrar');
  };

  var escondeModal = function escondeModal() {
    MODALCATEGORIA.modal('hide');
  };

  var muestraModal = function muestraModal(categoria) {
    if (categoria) {
      setFormElement('txt-descripcion', categoria.Descripcion);
      setFormElement('hdn-id', categoria.Id);
      setFormElement('accion', 'editar');
    } else {
      limpiaFormulario();
    }

    MODALCATEGORIA.modal('show');
  };

  return {
    formCategoria: formCategoria,
    generarTabla: generarTabla,
    getCategoria: getCategoria,
    limpiaFormulario: limpiaFormulario,
    formConfirmacion: formConfirmacion,
    getTablaCate: getTablaCate
  };
};

var CategoriaController = function CategoriaController(service, ui) {
  var categoriaSeleccionada = {};
  var lstCategoria = [];

  var mostrarCategorias = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return service.listarCategoria({});

            case 3:
              lstCategorias = _context6.sent;
              ui.generarTabla(lstCategoria);
              _context6.next = 10;
              break;

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 7]]);
    }));

    return function mostrarCategorias() {
      return _ref6.apply(this, arguments);
    };
  }();

  var manejaSubmitCate = function manejaSubmitCate() {
    ui.formCategoria.addEventListener('submit', /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(evt) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                evt.preventDefault();
                categoriaSeleccionada = ui.getCategoria();
                _context7.prev = 2;

                if (!(categoriaSeleccionada.accion === 'registrar')) {
                  _context7.next = 9;
                  break;
                }

                categoriaSeleccionada.Id = 0;
                _context7.next = 7;
                return service.crearCategoria(categoriaSeleccionada);

              case 7:
                _context7.next = 12;
                break;

              case 9:
                if (!(categoriaSeleccionada.accion === 'editar')) {
                  _context7.next = 12;
                  break;
                }

                _context7.next = 12;
                return service.actualizarCategoria(categoriaSeleccionada);

              case 12:
                ui.escondeModal();
                ui.limpiaFormulario();
                _context7.next = 19;
                break;

              case 16:
                _context7.prev = 16;
                _context7.t0 = _context7["catch"](2);
                console.error(_context7.t0);

              case 19:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 16]]);
      }));

      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }());
  };

  var manejaSubmitConf = function manejaSubmitConf() {
    ui.formConfirmar().addEventListener('submit', /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(evt) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                evt.preventDefault();
                _context8.next = 3;
                return service.eliminarCategoria(categoriaSeleccionada.Id);

              case 3:
                _context8.next = 5;
                return mostrarCategorias();

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x7) {
        return _ref8.apply(this, arguments);
      };
    }());
  };

  var manejaClickTabla = function manejaClickTabla() {};

  var init = function init() {
    mostrarCategorias();
    manejaSubmitCate();
    manejaSubmitConf();
  };

  return {
    init: init
  };
};

var crearCategoria = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(categoria) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return AthenasNet.llamadaApi({
              type: 'POST',
              data: JSON.stringify(categoria),
              url: 'Categoria/Crear'
            });

          case 3:
            respuesta = _context9.sent;
            //activar el toast
            console.log(respuesta);
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            console.error(_context9.t0);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function crearCategoria(_x8) {
    return _ref9.apply(this, arguments);
  };
}();

var actualizarCategoria = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(categoria) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return AthenasNet.llamadaApi({
              type: 'POST',
              data: JSON.stringify(categoria),
              url: 'Categoria/Actualizar'
            });

          case 3:
            respuesta = _context10.sent;
            //activar el toast
            console.log(respuesta);
            _context10.next = 10;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            console.error(_context10.t0);

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));

  return function actualizarCategoria(_x9) {
    return _ref10.apply(this, arguments);
  };
}();

var generarTempCategoria = function generarTempCategoria(categoria) {
  var template = "\n    <tr>\n        <td>".concat(categoria.Id, "</td>\n        <td>").concat(categoria.Descripcion, "</td>\n        <td>\n            <button type=\"button\" class=\"btn btn-success btn-sm btn-sin-click\" data-id=\"").concat(categoria.Id, "\" data-accion=\"editar\">\n                <i class=\"fas fa-edit\"></i>\n            </button>\n            <button type=\"button\" class=\"btn btn-success btn-sm btn-sin-click\" data-id=\"").concat(categoria.Id, "\" data-accion=\"eliminar\">\n                <i class=\"fas fa-trash-alt\" data-del-action=\"true\"></i>\n            </button>\n        </td>\n    </tr>\n");
  return template;
};

var generarTabla = function generarTabla(lstCategorias) {
  var tBody = document.querySelector('#tb-categoria tbody');
  var tableBody = "";
  lstCategorias.forEach(function (cat) {
    tableBody += generarTempCategoria(cat);
  });
  tBody.innerHTML = tableBody;
};

var listarCategoria = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(filtros) {
    var filtrosDefecto, respuesta;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            filtrosDefecto = _objectSpread({
              Descripcion: ''
            }, filtros);
            _context11.next = 4;
            return AthenasNet.llamadaApi({
              data: filtrosDefecto,
              url: 'Categoria/Listar'
            });

          case 4:
            respuesta = _context11.sent;
            //activar el toast
            console.log(respuesta);
            categorias = respuesta.Data;
            generarTabla(categorias);
            _context11.next = 13;
            break;

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            console.error(_context11.t0);

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));

  return function listarCategoria(_x10) {
    return _ref11.apply(this, arguments);
  };
}();

var buscarCategoria = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(id) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return AthenasNet.llamadaApi({
              data: {
                Id: id
              },
              url: 'Categoria/Obtener'
            });

          case 3:
            respuesta = _context12.sent;
            //activar el toast
            console.log(respuesta);
            $('#modal-categoria').modal('hide'); //Limpiar campos

            _context12.next = 11;
            break;

          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12["catch"](0);
            //mensaje de error en el toast
            console.error(_context12.t0);

          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 8]]);
  }));

  return function buscarCategoria(_x11) {
    return _ref12.apply(this, arguments);
  };
}();

var eliminarCategoria = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(id) {
    var respuesta;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return AthenasNet.llamadaApi({
              data: {
                Id: id
              },
              url: 'Categoria/Eliminar'
            });

          case 3:
            respuesta = _context13.sent;
            //activar el toast
            console.log(respuesta);
            _context13.next = 10;
            break;

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            console.error(_context13.t0);

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));

  return function eliminarCategoria(_x12) {
    return _ref13.apply(this, arguments);
  };
}();

window.addEventListener('load', function () {
  listarCategoria({});
  var tablaCategoria = document.querySelector('#tb-categoria');
  var btnNuevo = document.querySelector('#btn-nuevo');
  var formCategoria = document.getElementById('form-categoria');
  var formConfirmar = document.getElementById('form-confirmar');
  var formElementos = formCategoria.elements;
  btnNuevo.addEventListener('click', function () {
    formElementos['accion'].value = 'registrar';
  });
  $('#modal-categoria').on('show.bs.modal', function (e) {
    if (formElementos['accion'].value === 'registrar') {
      formElementos['descripcion'].value = '';
      formElementos['hdn-id'].value = 0;
    }
  });
  tablaCategoria.addEventListener('click', function (evt) {
    if (evt.target.dataset.id) {
      var _evt$target$dataset = evt.target.dataset,
          id = _evt$target$dataset.id,
          accion = _evt$target$dataset.accion;

      if (accion === 'editar') {
        console.log(formElementos);
        var cateSeleccionada = categorias.find(function (c) {
          return c.Id === parseInt(id);
        });
        formElementos['descripcion'].value = cateSeleccionada.Descripcion;
        formElementos['hdn-id'].value = cateSeleccionada.Id;
        formElementos['accion'].value = 'editar';
        $('#modal-categoria').modal('show');
      } else if (accion === 'eliminar') {
        console.log('eliminar');
        $('#modal-confirmar').modal('show');
      }
    }
  });
  formCategoria.addEventListener('submit', /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(evt) {
      var accion, categoria;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              evt.preventDefault();
              accion = formElementos['accion'].value;
              categoria = {
                Descripcion: formElementos['txt-descripcion'].value,
                Id: parseInt(formElementos['hdn-id'].value)
              };

              if (!(accion === 'registrar')) {
                _context14.next = 8;
                break;
              }

              _context14.next = 6;
              return crearCategoria(categoria);

            case 6:
              _context14.next = 11;
              break;

            case 8:
              if (!(accion === 'editar')) {
                _context14.next = 11;
                break;
              }

              _context14.next = 11;
              return actualizarCategoria(categoria);

            case 11:
              $('#modal-categoria').modal('hide');
              _context14.next = 14;
              return listarCategoria({});

            case 14:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x13) {
      return _ref14.apply(this, arguments);
    };
  }());
});
//# sourceMappingURL=categoria.js.map