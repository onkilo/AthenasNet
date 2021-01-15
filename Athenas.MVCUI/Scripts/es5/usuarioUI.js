"use strict";

var UsuarioUI = function UsuarioUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Nombre'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstUsuarios) {
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();
    var data = {
      filas: lstUsuarios,
      edita: true,
      elimina: true,
      iniCodigo: 'US'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getUsuario = function getUsuario() {
    return AthenasNet.Mant.getEntidad(['Id', 'accion', 'Nombre', 'Apellido', 'Dni', 'Direccion', 'Telefono', 'Email', 'Sexo', 'Usuario', 'Contrasenia', 'Roles']);
  };

  return {
    getUsuario: getUsuario,
    generarTabla: generarTabla,
    getFiltros: getFiltros,
    ID_TEMP_ROL: 'temp-lst-rol',
    SEL_CBO_ROL: '#form-mantenedor #cbo-roles'
  };
};
//# sourceMappingURL=usuarioUI.js.map