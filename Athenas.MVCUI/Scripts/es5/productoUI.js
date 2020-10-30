"use strict";

var ProductoUI = function ProductoUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Descripcion'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstProductos) {
    var data = {
      filas: lstProductos,
      edita: true,
      elimina: true,
      iniCodigo: 'PD'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getProducto = function getProducto() {
    return AthenasNet.Mant.getEntidad(['Descripcion', 'Id', 'accion', 'PrecioCompra', 'PrecioVenta', 'StockActual', 'StockMin', 'Categoria', 'Imagen']);
  };

  var getImgInput = function getImgInput() {
    return document.querySelector('#form-mantenedor #Imagen');
  };

  var getImgDisplay = function getImgDisplay() {
    return document.querySelector('#imgDisplay');
  };

  var getBase64Data = function getBase64Data(archivo) {
    return new Promise(function (resolve, reject) {
      var lector = new FileReader();

      lector.onload = function (evt) {
        resolve(evt.target.result);
      };

      lector.onerror = function (err) {
        reject(err);
      };

      lector.readAsDataURL(archivo);
    });
  };

  return {
    getProducto: getProducto,
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    getImgInput: getImgInput,
    getBase64Data: getBase64Data,
    getImgDisplay: getImgDisplay,
    ID_TEMP_CAT: 'temp-lst-categoria',
    SEL_CBO_CAT: '#form-mantenedor #Categoria'
  };
};
//# sourceMappingURL=productoUI.js.map