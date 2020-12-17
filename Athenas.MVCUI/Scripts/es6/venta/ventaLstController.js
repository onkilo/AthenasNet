const VentaController = (service, ui) => {
    let lstVentas = [];
    let ventaSeleccionada = {};
    const { Mant } = AthenasNet;

    const muestraVentas = async (filtros = {}) => {
        try {
            lstVentas = await service.listar(filtros);
            ui.generarTabla(lstVentas.map(p => {

                let importe = 0;

                p.Detalles.forEach(d => importe += (d.Cantidad * d.Precio));

                return {
                    Id: p.Id,
                    Cliente: p.Cliente.Nombre + ' ' + p.Cliente.Apellido,
                    Colaborador: p.Trabajador.Nombre + ' ' + p.Trabajador.Apellido,
                    Fecha: AthenasNet.formatFecha(p.FFecha),
                    Importe: AthenasNet.formatPrecio(importe)
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
