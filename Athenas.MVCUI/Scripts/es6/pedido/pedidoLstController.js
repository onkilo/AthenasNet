
const PedidoController = (service, ui, arg3, arg4, { esVendedor }) => {
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
                else if (accion === 'detalle') {
                    ui.abreModalPedido();

                    let total = 0;

                    pedidoSeleccionado.Detalles.forEach(det => {
                        total += parseInt(det.Cantidad) * parseFloat(det.Precio)
                    })

                    const pedidoMostrado = {
                        Codigo: AthenasNet.formatCodigo(pedidoSeleccionado.Id, 'PED', 4),
                        FFecha: pedidoSeleccionado.FFecha,
                        Colaborador: pedidoSeleccionado.Trabajador.Nombre + ' ' + pedidoSeleccionado.Trabajador.Apellido,
                        Proveedor: {
                            RzSocial: pedidoSeleccionado.Proveedor.RzSocial,
                            Direccion: pedidoSeleccionado.Proveedor.Direccion,
                            Telefono: pedidoSeleccionado.Proveedor.Telefono
                        },
                        Detalles: pedidoSeleccionado.Detalles.map(det => ({
                            Codigo: AthenasNet.formatCodigo(det.Producto.Id, 'PRD', 4),
                            Descripcion: det.Producto.Descripcion,
                            Precio: AthenasNet.formatPrecio(det.Precio),
                            Cantidad: det.Cantidad,
                            Subtotal: AthenasNet.formatPrecio(det.Cantidad * det.Precio)
                        })),
                        Total: total.toFixed(2)
                    }

                    ui.setModalPedidoData(pedidoMostrado);

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


    const muestraMensaje = () => {
        if (localStorage.getItem('mensaje')) {

            const mensaje = JSON.parse(localStorage.getItem('mensaje'));

            AthenasNet.muestraToast({ mensaje: mensaje.texto, titulo: mensaje.titulo, cssClass: mensaje.color })

            localStorage.removeItem('mensaje');
        }
    }

    const iniciar = async () => {
        
        manejaEvtTabla();
        manejaEnvioConf();
        manejaEnvioFiltro();
        await muesraPedidos();
        muestraMensaje();

    }


    return {
        iniciar
    }
}
