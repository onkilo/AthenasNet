const InicioUI = () => {


    const setCantidades = (objCantidades = {}) => {

        document.getElementById('txt-cant-producto').innerText = objCantidades.CantProductos;
        document.getElementById('txt-cant-cliente').innerText = objCantidades.CantClientes;
        document.getElementById('txt-cant-venta').innerText = objCantidades.CantVentas;
        document.getElementById('txt-cant-usuario').innerText = objCantidades.CantUsuarios;


    }

    const setPromoActualData = (data) => {
        AthenasNet.compilaTemplate('tempPromoActual', data, '#tb-promocion > tbody')
        $('#tb-promocion').DataTable();
    }

    const setProdBajoStockData = (data) => {
        AthenasNet.compilaTemplate('tempProdBajoStock', data, '#tb-producto > tbody')
        $('#tb-producto').DataTable();
    }

    const muestraVendedor = () => {

        const noDisplay = document.querySelectorAll('.no-vendedor');

        Array.from(noDisplay).forEach(elemento => elemento.style.display = 'none');

    }

    return {
        setCantidades,
        setProdBajoStockData,
        setPromoActualData,
        muestraVendedor
    }
}