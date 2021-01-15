const VentaController = (service, ui, clienteService, productoService) => {
    let lstProductos = [];
    let lstClientes = [];
    let tipoBusqueda = null;//Producto, Cliente
    let lstDetalles = [];
    let prodSeleccionado = {};
    let cliSeleccionado = {};
    let descuento = 0;

    const muestraProductos = async () => {
        lstProductos = await productoService.listar({});
        const data = {
            titulo: 'Buscar Producto',
            cabecera: [
                'Descripción',
                'Precio',
                'Stock',
                'Descuento',
                'Categoría',
                'Acciones'
            ],
            filas: lstProductos.map(prod => {

                return {
                    data: {
                        Descripcion: prod.Descripcion,
                        Precio: AthenasNet.formatPrecio(prod.PrecioVenta),
                        Stock: prod.StockActual,
                        Descuento: AthenasNet.formatPrecio(prod.Descuento),
                        Categoria: prod.Categoria.Descripcion
                    },
                    Id: prod.Id
                }

            })
        }

        ui.setModalBuscarData(data);
        console.log(lstProductos)
    }

    const muestraClientes = async () => {
        lstClientes = await clienteService.listarCliente({});
        const data = {
            titulo: 'Buscar Cliente',
            cabecera: [
                'Nombre Completo',
                'Dni',
                'Teléfono',
                'Acciones'
            ],
            filas: lstClientes.map(cli => {

                return {
                    data: {
                        Nombre: cli.Nombre + ' ' + cli.Apellido ,
                        Dni: cli.Dni,
                        Telefono: cli.Telefono
                    },
                    Id: cli.Id
                }

            })
        }
        ui.setModalBuscarData(data);
        console.log(lstClientes)
    }

    const evtBtnBuscarProducto = () => ui.getBtnBuscarProducto().addEventListener('click', () => tipoBusqueda = 'Producto');

    const evtBtnBuscarCliente = () => ui.getBtnBuscarCliente().addEventListener('click', () => tipoBusqueda = 'Cliente');

    const evtAbreModal = () => {
        ui.getModalBuscar().on('show.bs.modal', (e) => {
            if (tipoBusqueda === 'Producto') muestraProductos();
            else muestraClientes();
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
                        PrecioVenta: AthenasNet.formatPrecio(prodSeleccionado.PrecioVenta),
                        Descuento: AthenasNet.formatPrecio(prodSeleccionado.Descuento),
                        Codigo: AthenasNet.formatCodigo(prodSeleccionado.Id, 'PRD', 4)
                    });
                    ui.validaProdSeleccionado(true);
                    ui.getModalBuscar().modal('hide');
                }
                else {
                    cliSeleccionado = lstClientes.find(cli => cli.Id === id);

                    ui.setCliente(cliSeleccionado);
                    ui.validaCliSeleccionado(true);
                    ui.getModalBuscar().modal('hide');
                }

            }

        })

    }

    const evtBtnAgregarDet = () => {

        ui.getBtnAgregarDet().addEventListener('click', () => {

            const cantidad = ui.getInputCantidad().value;
            console.log(cantidad);

            if (!cantidad || parseInt(cantidad) <= 0) {
                ui.validaCantidadDetalle(false);
            }
            else {
                ui.validaCantidadDetalle(true);
            }

            if (!prodSeleccionado.Id) {
                ui.validaProdSeleccionado(false);
            }

            if (prodSeleccionado.Id && (cantidad && parseInt(cantidad) > 0)) {

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
                    Precio: prodSeleccionado.PrecioVenta,
                    DesctUni: prodSeleccionado.Descuento

                });
            }
            
            muestraDetalle();
            ui.validaDetalle(true);
            ui.setProducto({
                Codigo: '',
                Descripcion: '',
                PrecioVenta: '',
                StockActual: '',
                Descuento: ''
            })

            prodSeleccionado = {};
            ui.getInputCantidad().value = '';

            }
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
        let subtotal = 0;
        
        let total = 0;
        

        const data = {

            filas: lstDetalles.map(det => {

                subtotal += parseInt(det.Cantidad) * det.Precio;
                descuento += parseInt(det.Cantidad) * det.DesctUni;
                total += parseInt(det.Cantidad) * det.Precio - parseInt(det.Cantidad) * det.DesctUni;


                return {
                    data: {
                        Codigo: AthenasNet.formatCodigo(det.Producto.Id, 'PRD', 4),
                        Descripcion: det.Producto.Descripcion,
                        Precio: AthenasNet.formatPrecio(det.Precio),
                        Cantidad: det.Cantidad,
                        SubTotal: AthenasNet.formatPrecio(det.Precio * det.Cantidad),
                        Descuento: AthenasNet.formatPrecio(det.DesctUni * det.Cantidad)
                    },
                    productoId: det.Producto.Id
                }
                
            })
        }

        ui.setDetalleData(data);
        ui.setSubTotal(subtotal.toFixed(2));
        ui.setDescuento(descuento.toFixed(2));
        ui.setTotal(total.toFixed(2));
    }

    
    const evtFormVenta = () => {

        const formVenta = ui.getFormVenta();
        formVenta.addEventListener('submit', async (e) => {

            e.preventDefault();

            const venta = {
                Cliente: {
                    Id: cliSeleccionado.Id
                },
                Detalles: lstDetalles,
                Descuento: descuento
            }
            if (!venta.Cliente.Id) {
                ui.validaCliSeleccionado(false);
            }

            if (lstDetalles.length <= 0) {
                ui.validaDetalle(false);
            }
            if (pedido.Cliente.Id && lstDetalles.length > 0) {
            
                try {
                    await service.crear(venta)
                    const mensaje = {
                        color: 'bg-success',
                        titulo: 'Registro exitoso',
                        texto: 'La venta fue registrada exitosamente'
                    }
                    localStorage.setItem('mensaje', JSON.stringify(mensaje));
                    window.location.href = AthenasNet.MVC_URL_BASE + 'Venta';
                }   
                catch (err) {
                    console.error(err);
                }
            }

        })

    }

    const iniciar = () => {
        evtBtnBuscarProducto();
        evtBtnBuscarCliente();
        evtAbreModal();
        evtBtnSelModalBuscar();
        evtBtnAgregarDet();
        evtEliminaDetalle();
        evtFormVenta();
    }

    return {
        iniciar
    }
}