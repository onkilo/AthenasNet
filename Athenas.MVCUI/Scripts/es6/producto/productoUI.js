
const ProductoUI = () => {

    const getFiltros = () => {
        const arrFiltros = ['Descripcion'];

        return AthenasNet.Mant.getFiltros(arrFiltros);

    }

    const generarTabla = (lstProductos) => {

        const data = {
            filas: lstProductos,
            edita: true,
            elimina: true,
            iniCodigo: 'PD'
        }

        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable().clear().destroy();

        AthenasNet.compilaTemplate(AthenasNet.ID_TEMP_TBL_BODY, data, AthenasNet.Mant.SEL_TBL_BODY);
        $(AthenasNet.Mant.SEL_TBL_MANT).DataTable();
    }

    const getProducto = () => {
        return AthenasNet.Mant.getEntidad([
            'Descripcion',
            'Id',
            'accion',
            'PrecioCompra',
            'PrecioVenta',
            'StockActual',
            'StockMin',
            'Categoria',
            'Imagen']);
    }

    const getImgInput = () => document.querySelector('#form-mantenedor #Imagen');

    const getImgDisplay = () => document.querySelector('#imgDisplay');

    const getBase64Data = (archivo) => {
        return new Promise((resolve, reject) => {
            const lector = new FileReader();
            lector.onload = (evt) => {
                resolve(evt.target.result);
            };
            lector.onerror = (err) => {
                reject(err);
            };

            lector.readAsDataURL(archivo);
        });
    }

    const evtResetModalProducto = () => {
        $('#modal-mantenedor').on('hidden.bs.modal', () => {
            document.getElementById('imgDisplay').src = '';
            document.querySelector('.custom-file-label').innerHTML = 'Elija un archivo...';
        })
    }

    return {
        getProducto,
        generarTabla,
        getFiltros,
        getImgInput,
        getBase64Data,
        getImgDisplay,
        ID_TEMP_CAT: 'temp-lst-categoria',
        SEL_CBO_CAT: '#form-mantenedor #Categoria',
        evtResetModalProducto
    }
}