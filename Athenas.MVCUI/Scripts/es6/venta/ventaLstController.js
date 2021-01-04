const VentaController = (service, ui) => {
    let lstVentas = [];
    let ventaSeleccionada = {};
    const { Mant } = AthenasNet;

    const muestraVentas = async (filtros = {}) => {
        try {
            lstVentas = await service.listar(filtros);
            ui.generarTabla(lstVentas.map(p => {

               
                return {
                    Id: p.Id,
                    Cliente: p.Cliente.Nombre + ' ' + p.Cliente.Apellido,
                    Colaborador: p.Trabajador.Nombre + ' ' + p.Trabajador.Apellido,
                    Fecha: AthenasNet.formatFecha(p.FFecha),
                    Importe: AthenasNet.formatPrecio(p.Total)
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

                ventaSeleccionada = lstVentas.find(c => c.Id === parseInt(id));
                ventaSeleccionada.accion = accion;

                if (accion === 'editar') {
                    await muestraVentas();
                    Mant.setFormMantenedor(
                        {
                            ...ventaSeleccionada,
                            Valor: parseFloat(ventaSeleccionada.Valor).toFixed(2),
                            Producto: ventaSeleccionada.Producto.Id,
                            Fecha: ventaSeleccionada.FFecha,                          
                        },
                        ['Activo', 'FFecha']);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();

                } else if (accion === 'detalle') {
                    ui.abreModalVenta();

                    let subtotal = 0;
                    let descuento = 0;
                    let total = 0;

                    ventaSeleccionada.Detalles.forEach(det => {
                        subtotal += parseInt(det.Cantidad) * parseFloat(det.Precio),
                        descuento += parseInt(det.Cantidad) * parseFloat(det.DesctUni),
                        total += parseInt(det.Cantidad) * parseFloat(det.Precio) - parseInt(det.Cantidad) * parseFloat(det.DesctUni)
                    })

                    const ventaMostrada = {
                        Codigo: AthenasNet.formatCodigo(ventaSeleccionada.Id, 'VEN', 4),
                        FFecha: ventaSeleccionada.FFecha,
                        Colaborador: ventaSeleccionada.Trabajador.Nombre + ' ' + ventaSeleccionada.Trabajador.Apellido,
                        Cliente: {
                            Nombre: ventaSeleccionada.Cliente.Nombre,
                            Dni: ventaSeleccionada.Cliente.Dni,
                            Telefono: ventaSeleccionada.Cliente.Telefono
                        },
                        Detalles: ventaSeleccionada.Detalles.map(det => ({
                            Codigo: AthenasNet.formatCodigo(det.Producto.Id, 'PRD', 4),
                            Descripcion: det.Producto.Descripcion,
                            Precio: AthenasNet.formatPrecio(det.Precio),
                            Cantidad: det.Cantidad,
                            SubTotal: AthenasNet.formatPrecio(det.Cantidad * det.Precio),
                            Descuento: AthenasNet.formatPrecio(det.Cantidad * det.DesctUni)
                        })),
                        SubTotal: subtotal.toFixed(2),
                        Descuento: descuento.toFixed(2),
                        Total: total.toFixed(2)
                    }

                    ui.setModalVentaData(ventaMostrada);

                }
            }


        });
    }



    const manejaEnvioConf = () => {
        AthenasNet.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminar(parseInt(ventaSeleccionada.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'La venta fue eliminada satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraVentas();
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
            await muestraVentas(filtros);
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
        await muestraVentas();
        muestraMensaje();

    }


    return {
        iniciar
    }
}
