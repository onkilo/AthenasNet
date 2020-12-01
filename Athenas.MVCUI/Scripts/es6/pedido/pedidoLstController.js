
const PedidoController = (service, ui) => {
    let lstPedidos = [];
    let pedSeleccionado = {};
    const { Mant } = AthenasNet;

    const muestraPedidos = async (filtros = {}) => {
        try {
            lstPedidos = await service.listar(filtros);
            ui.generarTabla(lstPedidos.map(p => {

                let importe = 0;

                p.Detalles.forEach(det => importe += (det.Precio * det.Cantidad) );

                return {
                    Id: p.Id,
                    Fecha: AthenasNet.formatFecha(p.FFecha),
                    Empleado: p.Trabajador.Nombre + ' ' + p.Trabajador.Apellido,
                    Proveedor: p.Proveedor.RzSocial,
                    Importe: AthenasNet.formatPrecio(importe),
                    Estado: p.Estado === 0 ? 'Registrado' : 'Recibido'
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

                pedSeleccionado = lstPedidos.find(c => c.Id === parseInt(id));
                pedSeleccionado.accion = accion;

                if (accion === 'editar') {
                    window.location.href = `${AthenasNet.MVC_URL_BASE}/Pedido/Recibir/${pedSeleccionado.Id}`
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
                await service.eliminar(parseInt(pedSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'El pedido fue eliminado satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraPedidos();
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
            await muestraPedidos(filtros);
        })
    }


    const iniciar = () => {
        muestraPedidos();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioConf();
        manejaEnvioFiltro();
    }


    return {
        iniciar
    }
}
