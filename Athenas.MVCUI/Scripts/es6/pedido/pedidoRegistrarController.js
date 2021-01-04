const PedidoController = (service, ui, proveedorService, productoService) => {
    let lstProductos = [];
    let lstProveedores = [];
    let tipoBusqueda = null;//Producto, Proveedor
    let lstDetalles = [];
    let prodSeleccionado = {};
    let provSeleccionado = {};

    const muestraProductos = async () => {
        lstProductos = await productoService.listar({});
        const data = {
            titulo: 'Buscar Producto',
            cabecera: [
                'Descripción',
                'Precio',
                'Stock',
                'Categoría',
                'Acciones'
            ],
            filas: lstProductos.map(prod => {

                return {
                    data: {
                        Descripcion: prod.Descripcion,
                        Precio: AthenasNet.formatPrecio(prod.PrecioCompra),
                        Stock: prod.StockActual,
                        Categoria: prod.Categoria.Descripcion
                    },
                    Id: prod.Id
                }

            })
        }

        ui.setModalBuscarData(data);
        console.log(lstProductos)
    }

    const muestraProveedores = async () => {
        lstProveedores = await proveedorService.listarProveedor({});
        const data = {
            titulo: 'Buscar Proveedor',
            cabecera: [
                'Razón Social',
                'Representante',
                'Dirección',
                'Teléfono',
                'Acciones'
            ],
            filas: lstProveedores.map(prov => {

                return {
                    data: {
                        RzSocial: prov.RzSocial,
                        Representante: prov.Representante,
                        Direccion: prov.Direccion,
                        Telefono: prov.Telefono
                    },
                    Id: prov.Id
                }

            })
        }
        ui.setModalBuscarData(data);
        console.log(lstProveedores)
    }

    const evtBtnBuscarProducto = () => ui.getBtnBuscarProducto().addEventListener('click', () => tipoBusqueda = 'Producto');

    const evtBtnBuscarProveedor = () => ui.getBtnBuscarProveedor().addEventListener('click', () => tipoBusqueda = 'Proveedor');

    //const evtAbreModal = () => {
    //    ui.getModalBuscar().on('show.bs.modal', async (e) => {
    //        if (tipoBusqueda === 'Producto') await muestraProductos();
    //        else await muestraProveedores();

    //        evtBtnSelModalBuscar();
    //    })
    //}

    const evtAbreModal = () => {
        ui.getModalBuscar().on('show.bs.modal', (e) => {
            if (tipoBusqueda === 'Producto') muestraProductos();
            else muestraProveedores();
        })
    }

    const evtBtnSelModalBuscar = () => {

        ui.getModalContentBuscar().addEventListener('click', (e) => {

            if (e.target.dataset.seleccionId) {

                console.log('click de seleccion');

                const id = parseInt(e.target.dataset.seleccionId);

                if (tipoBusqueda === 'Producto') {

                    prodSeleccionado = lstProductos.find(prod => prod.Id === id);

                    ui.setProducto({
                        ...prodSeleccionado,
                        PrecioCompra: AthenasNet.formatPrecio(prodSeleccionado.PrecioCompra),
                        Codigo: AthenasNet.formatCodigo(prodSeleccionado.Id, 'PRD', 4)
                    });
                    ui.getModalBuscar().modal('hide');
                }
                else {
                    provSeleccionado = lstProveedores.find(prov => prov.Id === id);

                    ui.setProveedor(provSeleccionado);
                    ui.getModalBuscar().modal('hide');
                }

            }

        })

    }

    const evtBtnAgregarDet = () => {

        ui.getBtnAgregarDet().addEventListener('click', () => {

            const cantidad = ui.getInputCantidad().value;

            let encontrado = false;

            for (let i = 0; i < lstDetalles.length; i++) {

                if (prodSeleccionado.Id === lstDetalles[i].Producto.Id) {

                    lstDetalles[i].Cantidad = parseInt(cantidad);

                    encontrado = true;
                    break;
                }

            }

            if (!encontrado) {
                lstDetalles.push({

                    Producto: {
                        Id: prodSeleccionado.Id,
                        Descripcion: prodSeleccionado.Descripcion
                    },
                    Cantidad: parseInt(cantidad),
                    Precio: prodSeleccionado.PrecioCompra

                });
            }
           

            muestraDetalle();
        })

    }

    const evtEliminaDetalle = () => {

        ui.getTblDetalle().addEventListener('click', (e) => {

            if (e.target.dataset.productoId) {
                const id = parseInt(e.target.dataset.productoId);

                lstDetalles = lstDetalles.filter(det => det.Producto.Id !== id);
                muestraDetalle();


            }

        })

    }

    const muestraDetalle = () => {
        let total = 0;

        const data = {

            filas: lstDetalles.map(det => {

                total += parseInt(det.Cantidad) * det.Precio;

                return {
                    data: {
                        Codigo: AthenasNet.formatCodigo(det.Producto.Id, 'PRD', 4),
                        Descripcion: det.Producto.Descripcion,
                        Precio: AthenasNet.formatPrecio(det.Precio),
                        Cantidad: det.Cantidad,
                        SubTotal: AthenasNet.formatPrecio(det.Precio * det.Cantidad)
                        
                    },
                    productoId: det.Producto.Id
                }

            })
        }

        ui.setDetalleData(data);
        ui.setTotal(total.toFixed(2));
    }

    const evtFormPedido = () => {

        ui.getFormPedido().addEventListener('submit', async (e) => {

            e.preventDefault();

            const pedido = {
                Proveedor: {
                    Id: provSeleccionado.Id
                },
                Detalles: lstDetalles
            }
            try {
                
                await service.crear(pedido)
                const mensaje = {
                    color: 'bg-success',
                    titulo: 'Registro exitoso',
                    texto: 'El pedido fue registrado exitosamente'
                }
                localStorage.setItem('mensaje', JSON.stringify(mensaje));
                window.location.href = AthenasNet.MVC_URL_BASE + 'Pedido';
            }
            catch (err) {
                console.error(err);
            }
            
        })

    }

    const iniciar = () => {
        evtBtnBuscarProducto();
        evtBtnBuscarProveedor();
        evtAbreModal();
        evtBtnSelModalBuscar();
        evtBtnAgregarDet();
        evtEliminaDetalle();
        evtFormPedido();
    }

    return {
        iniciar
    }
}