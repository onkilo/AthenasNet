const formRecibir = document.getElementById('form-recibir');
const id = document.getElementById('Id').value;
window.addEventListener('load', () => {

    formRecibir.addEventListener('submit', async (e) => {
        e.preventDefault();


        const service = PedidoService();



        try {
            await service.recibir(id);
            window.location.href = AthenasNet.MVC_URL_BASE + 'Pedido';
        }
        catch (err) {
            console.error(err);
            AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: 'Hubo un error al recibir este pedido', titulo: 'Error' })
        }

    })

})
