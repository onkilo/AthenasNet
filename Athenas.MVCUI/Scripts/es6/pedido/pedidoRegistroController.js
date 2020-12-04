const PedidoController = (service, ui, proveedorService, productoService) => {

    let tipoBusqueda = null;
    let lstDetalles = [];
    let provSelecionado = {};
    let prodSelecionado = {};
    let lstProveedores = [];
    let lstProductos = [];

    const evtMostrarModalBuscar = () => {
        ui.getModalBuscar().on('show.bs.modal', (e) => {
            console.log("abriendo")
            if (tipoBusqueda === 'Proveedor') muestraProveedores();
            else muestraProductos();
        })

    }

    const evtBtnBuscarProducto = () => {
        ui.getBtnBuscarProducto().addEventListener('click', () => tipoBusqueda = 'Producto' )
    }
    const evtBtnBuscarProveedor = () => {
        console.log(ui.getBtnBuscarProveedor())
        ui.getBtnBuscarProveedor().addEventListener('click', () => {
            tipoBusqueda = 'Proveedor'
        })
    }

    const muestraProductos = async () => {

        lstProductos = await productoService.listar({});
        console.log(lstProductos);

        const data = {
            titulo: 'Buscar Producto',
            cabecera: [
                'Descripción',
                'Precio',
                'Stock',
                'Categoría',
                'Acciones'
            ],
            columnas: lstProductos.map(p => ({
                data: {
                    Descripcion: p.Descripcion,
                    Precio: p.PrecioCompra,
                    Stock: p.StockActual,
                    Categoria: p.Categoria.Descripcion
                },
                Id: p.Id
            }))
        }

        ui.setModalBuscarData(data);
        evtTblBuscar();
    }

    const muestraProveedores = async () => {
        lstProveedores = await proveedorService.listarProveedor({});
        console.log(lstProveedores);

        const data = {
            titulo: 'Buscar Proveedor',
            cabecera: [
                'Razón Social',
                'Representante',
                'Dirección',
                'Teléfono',
                'Acciones'
            ],
            columnas: lstProveedores.map(p => ({
                data: {
                    RzSocial: p.RzSocial,
                    Representante: p.Representante,
                    Direccion: p.Direccion,
                    Telefono: p.Telefono
                },
                Id: p.Id
            }))
        }

        ui.setModalBuscarData(data);
        evtTblBuscar();
    } 

    const evtTblBuscar = () => {
        ui.getTblModalBuscar().addEventListener('click', (e) => {

            if (e.target.dataset.seleccionId) {
                const id = e.target.dataset.seleccionId;
                if (tipoBusqueda === 'Proveedor') {
                    provSelecionado = lstProveedores.find((p) => p.Id === parseInt(id))
                    ui.setProveedor(provSelecionado);
                }
                else {
                    prodSelecionado = lstProductos.find((p) => p.Id === parseInt(id))
                    ui.setProducto({
                        ...prodSelecionado,
                        Codigo: AthenasNet.formatId(prodSelecionado.Id, 'PRD', 4),
                        PrecioCompra: AthenasNet.formatPrecio(prodSelecionado.PrecioCompra)
                    });
                }

                ui.getModalBuscar().modal('hide');
                //$('#modalBuscar').modal('hide');
            }

        })
    }

    const evtBtnAgregarDet = () => {
        ui.getBtnAgregarDet().addEventListener('click', () => {

            const cantidad = document.getElementById('Producto.Cantidad').value;
            let encontrado = false;

            //lstDetalles.forEach(det => {
            //    if (det.Producto.Id === prodSelecionado.Id) {
            //        det.Cantidad = cantidad;
            //        encontrado = true;
            //        break;
            //    }
            //})

            for (let i = 0; i < lstDetalles.length; i++) {
                if (lstDetalles[i].Producto.Id === prodSelecionado.Id) {
                    lstDetalles[i].Cantidad = cantidad;
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                lstDetalles.push({
                    Producto: {
                        ...prodSelecionado
                    },
                    Cantidad: cantidad,
                    Precio: prodSelecionado.PrecioCompra
                })
            }
            

            console.log(lstDetalles);

            ui.setDetallesData({
                filas: lstDetalles.map(det => ({
                    Codigo: AthenasNet.formatId(det.Producto.Id, 'PRD', 4),
                    Descripcion: det.Producto.Descripcion,
                    Cantidad: det.Cantidad,
                    Precio: AthenasNet.formatPrecio(det.Precio),
                    SubTotal: AthenasNet.formatPrecio(det.Cantidad * det.Precio),
                    Id: det.Producto.Id
                }))
            })

            mostrarTotal();
        });
    }

    const mostrarTotal = () => {
        let total = 0;

        lstDetalles.forEach(det => {
            total += (det.Precio * det.Cantidad);
        });

        document.getElementById('total').value = total.toFixed(2);
    }

    const evtEnvioPedido = () => {
        ui.getFormPedido().addEventListener('submit', async (e) => {
            e.preventDefault();

            const pedido = {
                Trabajador: {
                    Id: 8
                },
                Proveedor: {
                    Id: provSelecionado.Id
                },
                Detalles: lstDetalles
            }

            try {
                await service.crear(pedido);
                AthenasNet.muestraToast({
                    cssClass: 'bg-success', mensaje: 'El pedido se registró correctamente', titulo: 'Éxito'
                })
            }
            catch (err) {
                console.error(err);
                AthenasNet.muestraToast({
                    cssClass: 'bg-danger', mensaje: 'Hubo un error al registrar el pedido', titulo: 'Error'
                })
            }
        })
    }

    const iniciar = () => {
        evtMostrarModalBuscar();
        evtBtnBuscarProducto();
        evtBtnBuscarProveedor();
        evtBtnAgregarDet();
        evtEnvioPedido();
    }


    return {
        iniciar
    }
}