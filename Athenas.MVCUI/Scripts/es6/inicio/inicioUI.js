const InicioUI = () => {

    const setCantVenta = (cantidad) => document.getElementById('txt-cant-venta').innerText = cantidad;

    const setCantProducto = (cantidad) => document.getElementById('txt-cant-producto').innerText = cantidad;

    const setCantUsuario = (cantidad) => {
        const txtcantVenta = document.getElementById('txt-cant-usuario')
        if (txtcantVenta) {
            txtcantVenta.innerText = cantidad;
        }
    }

    const setCantCliente = (cantidad) => document.getElementById('txt-cant-cliente').innerText = cantidad;

    const setPromoData = (data) => {

        AthenasNet.compilaTemplate('tempTblPromosActuales', data, '#tb-promocion tbody');
        $('#tb-promocion').DataTable();
    }

    const setProductoData = (data) => {

        AthenasNet.compilaTemplate('tempTblProdBajoStock', data, '#tb-producto tbody');
        $('#tb-producto').DataTable();
    }
    const ocultarVendedor = () => {
        document.getElementById('info-usuarios').style.display = 'none';
    }

    return {
        setCantUsuario,
        setCantProducto,
        setCantVenta,
        setCantCliente,
        setPromoData,
        setProductoData,
        ocultarVendedor
    }
}