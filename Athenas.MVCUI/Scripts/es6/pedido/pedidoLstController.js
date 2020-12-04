
const PedidoController = (service, ui) => {
    let lstPedidos = [];
    let pedidoSeleccionado = {};
    const { Mant } = AthenasNet;

    const muesraPedidos = async (filtros = {}) => {
        try {
            lstPedidos = await service.listar(filtros);
            ui.generarTabla(lstPedidos.map(p => {

                let importe = 0;

                p.Detalles.forEach(d => importe += (d.Cantidad * d.Precio));

                return {
                    Id: p.Id,
                    Fecha: AthenasNet.formatFecha(p.FFecha),
                    Colaborador: p.Trabajador.Nombre + ' ' + p.Trabajador.Apellido,
                    Proveedor: p.Proveedor.RzSocial,
                    Importe: AthenasNet.formatPrecio(importe),
                    Estado: p.Estado === 0 ? 'Por Recibir' : 'Recibido'
                }

            }));
        }
        catch (err) {
            console.error(err);
        }
    }


    const manejaEvtTabla = () => {
        Mant.getTblMantenedor().addEventListener('click', async (evt) => {

            if (evt.target.dataset.id) {
                const { id, accion } = evt.target.dataset;

                pedidoSeleccionado = lstPedidos.find(c => c.Id === parseInt(id));
                pedidoSeleccionado.accion = accion;

                if (accion === 'editar') {
                    await muestraPoductos();
                    Mant.setFormMantenedor(
                        {
                            ...pedidoSeleccionado,
                            Valor: parseFloat(pedidoSeleccionado.Valor).toFixed(2),
                            Producto: pedidoSeleccionado.Producto.Id,
                            FechaFin: pedidoSeleccionado.FFechaFin,
                            FechaInicio: pedidoSeleccionado.FFechaInicio
                        },
                        ['Activo', 'FFechaInicio', 'FFechaFin']);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
    }



    const manejaEnvioConf = () => {
        AthenasNet.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminar(parseInt(pedidoSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'El pedido fue eliminado satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muesraPedidos();
            }
            catch (err) {
                console.error(err);
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: 'Hubo un error en la eliminación', titulo: 'Eliminación errónea' })
            }

        })
    }

    const manejaEnvioFiltro = () => {
        Mant.getFormFiltrar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            const filtros = ui.getFiltros();
            await muesraPedidos(filtros);
        })
    }




    const iniciar = () => {
        muesraPedidos();
        manejaEvtTabla();
        manejaEnvioConf();
        manejaEnvioFiltro();
    }


    return {
        iniciar
    }
}
