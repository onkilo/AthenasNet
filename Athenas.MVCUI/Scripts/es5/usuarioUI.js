"use strict";

var UsuarioUI = function UsuarioUI() {
  var ID_TEMP_ROL = 'temp-lst-roles';
  var SEL_CBO_ROL = '#cbo-roles';

  var getFiltros = function getFiltros() {
    var arrFiltros = ['Nombre'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstUsuarios) {
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
    return AthenasNet.Mant.getEntidad(['Nombre', 'Id', 'accion', 'Apellido', 'Dni', 'Sexo', 'Roles', 'Direccion', 'Email', 'Usuario', 'Contrasenia', 'Telefono']);
  };

  return {
    getFiltros: getFiltros,
    generarTabla: generarTabla,
    getUsuario: getUsuario,
    ID_TEMP_ROL: ID_TEMP_ROL,
    SEL_CBO_ROL: SEL_CBO_ROL
  };
};
//# sourceMappingURL=usuarioUI.js.map