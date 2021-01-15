"use strict";

var ClienteUI = function ClienteUI() {
  var getFiltros = function getFiltros() {
    var arrFiltros = ['Nombre'];
    return AthenasNet.Mant.getFiltros(arrFiltros);
  };

  var generarTabla = function generarTabla(lstClientes) {
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();
    var data = {
      filas: lstClientes,
      //=> item
      edita: true,
      elimina: true,
      iniCodigo: 'CL'
    };
    AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
    $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
  };

  var getCliente = function getCliente() {
    return AthenasNet.Mant.getEntidad(['Nombre', 'Id', 'accion', 'Apellido', 'Telefono', 'Dni', 'Sexo']);
  }; //const validaCliSeleccionado = (esValido) => {
  //    if (!esValido) {
  //        document.getElementById('Cliente.Nombre').classList.add('is-invalid')
  //        document.getElementById('Cliente.Apellido').classList.add('is-invalid')
  //        document.getElementById('Cliente.Telefono').classList.add('is-invalid')
  //        document.getElementById('Cliente.Dni').classList.add('is-invalid')
  //    }
  //    else {
  //        document.getElementById('Cliente.Nombre').classList.remove('is-invalid')
  //        document.getElementById('Cliente.Apellido').classList.remove('is-invalid')
  //        document.getElementById('Cliente.Telefono').classList.remove('is-invalid')
  //        document.getElementById('Cliente.Dni').classList.remove('is-invalid')
  //    }
  //}


  return {
    getCliente: getCliente,
    generarTabla: generarTabla,
    getFiltros: getFiltros
  };
};
//# sourceMappingURL=clienteUI.js.map