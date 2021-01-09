"use strict";

var CategoriaUI = function CategoriaUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Descripcion'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstCategorias) {
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();
    var data = {
      filas: lstCategorias,
      //=> item
      edita: true,
      elimina: true,
      iniCodigo: 'CT'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getCategoria = function getCategoria() {
    return AthenasNet.Mant.getEntidad(['Descripcion', 'Id', 'accion']);
  };

  return {
    getCategoria: getCategoria,
    generarTabla: generarTabla,
    getFiltros: getFiltros
  };
};
//# sourceMappingURL=categoriaUI.js.map