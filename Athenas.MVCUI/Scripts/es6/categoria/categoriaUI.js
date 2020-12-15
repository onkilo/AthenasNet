const CategoriaUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Descripcion'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (data) => {
        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getCategoria = () => {
        return AthenasNet.Mant.getEntidad(['Descripcion', 'Id', 'accion']);
    }

    return {
        getCategoria,
        generarTabla,
        getFiltros
    }
}