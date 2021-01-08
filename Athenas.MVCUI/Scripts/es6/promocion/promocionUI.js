
const PromocionUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Producto'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstPromociones) => {

        const data = {
            filas: lstPromociones,
            edita: true,
            elimina: true,
            iniCodigo: 'PM'
        }

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getPromocion = () => {
        return AthenasNet.Mant.getEntidad([
            'Producto',
            'Id',
            'accion',
            'Tipo',
            'Valor',
            'FechaInicio',
            'FechaFin']);
    }

    const muestraMsjTienePromo = (tienePromociones) => {
        if (!tienePromociones) {
            document.getElementById('msj-tiene-promo').classList.add('d-none');
        }
        else {
            document.getElementById('msj-tiene-promo').classList.remove('d-none');
        }
    }

    return {
        getPromocion,
        generarTabla,
        getFiltros,
        ID_TEMP_PROD: 'temp-lst-productos',
        SEL_CBO_PROD: '#form-mantenedor #Producto',
        muestraMsjTienePromo
    }
}