"use strict";

var ProductoUI = function ProductoUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Descripcion'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(data) {
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();
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

  var muestraVendedor = function muestraVendedor() {
    document.querySelector(AthenasNet.Mant.SEL_BTN_NUEVO).style.display = 'none';
  };

  var muestraDetalle = function muestraDetalle(Categoria) {
    getImgInput().style.display = 'none';
    document.getElementById('CategoriaText').classList.remove('d-none');
    document.getElementById('Categoria').classList.add('d-none');
    document.getElementById('CategoriaText').value = Categoria.Descripcion;
  };

  return {
    getProducto: getProducto,
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    getImgInput: getImgInput,
    getBase64Data: getBase64Data,
    getImgDisplay: getImgDisplay,
    ID_TEMP_CAT: 'temp-lst-categoria',
    SEL_CBO_CAT: '#form-mantenedor #Categoria',
    muestraVendedor: muestraVendedor,
    muestraDetalle: muestraDetalle
  };
};
//# sourceMappingURL=productoUI.js.map