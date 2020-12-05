const PedidoController = (service, ui) => {


    const iniciar = () => {
        const btnRecibir = ui.getBtnPostRecibir();
        btnRecibir.addEventListener('click', async () => {
            
            const Id = btnRecibir.dataset.id;
            debugger
            try {
                await service.recibir(Id);
                //AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: 'El pedido fue recibido exitosamente', titulo: 'Error' })
                const mensaje = {
                    color: 'bg-success',
                    titulo: 'Recepción exitosa',
                    texto: 'El pedido fue recibido exitosamente'
                }
                localStorage.setItem('mensaje', JSON.stringify(mensaje));
                window.location.href = AthenasNet.MVC_URL_BASE + 'Pedido';
            }
            catch (err) {
                console.error(err);
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: 'hubo un error al recibir el pedido', titulo: 'Error' })
            }
            

        })
    }

    return {
        iniciar
    }

}