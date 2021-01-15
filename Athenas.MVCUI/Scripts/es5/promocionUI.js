"use strict";

var PromocionUI = function PromocionUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Producto'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstPromociones) {
    var data = {
      filas: lstPromociones,
      edita: true,
      elimina: true,
      iniCodigo: 'PM'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getPromocion = function getPromocion() {
    return AthenasNet.Mant.getEntidad(['Producto', 'Id', 'accion', 'Tipo', 'Valor', 'FechaInicio', 'FechaFin']);
  };

  var muestraMsjTienePromo = function muestraMsjTienePromo(tienePromociones) {
    if (!tienePromociones) {
      document.getElementById('msj-tiene-promo').classList.add('d-none');
    } else {
      document.getElementById('msj-tiene-promo').classList.remove('d-none');
    }
  };

  return {
    getPromocion: getPromocion,
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    ID_TEMP_PROD: 'temp-lst-productos',
    SEL_CBO_PROD: '#form-mantenedor #Producto',
    muestraMsjTienePromo: muestraMsjTienePromo
  };
};
//# sourceMappingURL=promocionUI.js.map