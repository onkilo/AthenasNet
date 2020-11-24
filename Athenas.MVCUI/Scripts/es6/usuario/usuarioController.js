
const UsuarioController = (service, ui) => {
    let lstUsuarios = [];
    let usuSeleccionado = {};
    //let lstRoles = {};
    const { Mant } = AthenasNet;

    const muestraUsuarios = async (filtros = {}) => {
        try {
            lstUsuarios = await service.listar(filtros);
            ui.generarTabla(lstUsuarios.map(u => ({
                Id: u.Id,
                Nombre: u.Nombre,
                Apellido: u.Apellido,
                DNI: u.Dni,
                Sexo: u.Sexo === 'M' ? 'Masculino' : 'Femenino',
                Telefono: u.Telefono,
                Roles: u.Roles.map(rol => rol.Nombre).join(',')
            })));
        }
        catch (err) {
            console.error(err);
        }
    }

    const manejaEvtTabla = () => {
        Mant.getTblMantenedor().addEventListener('click', async (evt) => {

            if (evt.target.dataset.id) {
                const { id, accion } = evt.target.dataset;

                usuSeleccionado = lstUsuarios.find(c => c.Id === parseInt(id));
                usuSeleccionado.accion = accion;
                
                if (accion === 'editar') {
                    await muestraRoles();
                    delete usuSeleccionado.Roles
                    Mant.setFormMantenedor(
                        usuSeleccionado,
                        ['Activo', 'SexoDescripcion', 'Token']);
                }
                else if (accion === 'eliminar') {
                    console.log('eliminar')
                    AthenasNet.mostrarConfirmacion();
                }
            }


        });
    }


    const manejaEnvioUsu = () => {
        Mant.getFormMantenedor().addEventListener('submit', async (evt) => {
            evt.preventDefault();

            let usuario = ui.getUsuario();
            usuario = {
                ...usuario,
                Roles: usuario.Roles.map(r => ({ Id: parseInt(r) }))
                //Producto: {
                //    Id: parseInt(usuario.Producto)
                //}
            }
            console.log(usuario);
            try {
                if (usuario.accion === 'registrar') {
                    await service.crear(usuario);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'El usuario se registró satisfactoriamente', titulo: 'Registro exitoso' })
                }
                else if (usuario.accion === 'editar') {
                    await service.actualizar(usuario);
                    Mant.cerrarModMant();
                    AthenasNet.muestraToast({ mensaje: 'El usuario se actualizó satisfactoriamente', titulo: 'Actualización exitosa' })
                }
                await muestraUsuarios();
            }
            catch (err) {
                console.error(err);
                const mensaje = (usuario.accion === 'registrar') ? 'Hubo un error en el registro' : 'Hubo un error en la actualización';
                const titulo = (usuario.accion === 'registrar') ? 'Registro erróneo' : 'Actualización errónea';
                AthenasNet.muestraToast({ cssClass: 'bg-danger', mensaje: mensaje, titulo: titulo })
            }


        })

    }

    const manejaEnvioConf = () => {
        AthenasNet.getFormConfirmar().addEventListener('submit', async (evt) => {
            evt.preventDefault();//evitar la accion del evento
            try {
                await service.eliminar(parseInt(usuSeleccionado.Id));
                AthenasNet.ocultarConfirmacion();
                AthenasNet.muestraToast({ mensaje: 'El usuario fue eliminada satisfactoriamente', titulo: 'Eliminación exitosa' })
                await muestraUsuarios();
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
            await muestraUsuarios(filtros);
        })
    }


    const muestraRoles = async () => {
        const lstRoles = await service.roles({});

        let rolesDisplay = lstRoles;

        if (usuSeleccionado.Roles) {
            rolesDisplay = lstRoles.map(r => {
                const encontrado = usuSeleccionado.Roles.find(sel => {
                    return sel.Id === r.Id
                });

                if (encontrado)
                    return { ...r, selected: true }
                else
                    return r
            })
        }

        const tempCatData = {
            filas: rolesDisplay
        }
        console.log(lstRoles);
        AthenasNet.compilaTemplate(ui.ID_TEMP_ROL, tempCatData, ui.SEL_CBO_ROL);
        $('#cbo-roles').select2();
    }

    const manejaAbreModal = () => {
        Mant.getBtnNuevo().addEventListener('click', async () => {
            await muestraRoles();
        })
    }

    const iniciar = () => {
        Mant.configuraTamModal('modal-lg');
        muestraUsuarios();
        Mant.evtMostrarModMant();
        manejaEvtTabla();
        manejaEnvioUsu();
        manejaEnvioConf();
        manejaEnvioFiltro();
        manejaAbreModal();
    }


    return {
        iniciar
    }
}