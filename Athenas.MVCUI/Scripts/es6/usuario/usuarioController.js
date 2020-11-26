
const UsuarioController = (service, ui) => {
    let lstUsuario = [];
    let usuSeleccionado = {};
    const { Mant } = AthenasNet;

    const muestraUsuarios = async (filtros = {}) => {
        try {
            lstUsuario = await service.listar(filtros);
            ui.generarTabla(lstUsuario.map(p => ({
                Id: p.Id,
                Nombre: p.Nombre,
                Apellido: p.Apellido,
                Dni: p.Dni,
                Telefono: p.Telefono,
                Sexo: p.Sexo === 'M' ? 'Masculino' : 'Femenino',
                Roles: p.Roles.map(rol => rol.Nombre).join(', ')
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

                usuSeleccionado = lstUsuario.find(c => c.Id === parseInt(id));
                usuSeleccionado.accion = accion;

                if (accion === 'editar') {
                    await muestraRoles();
                    console.log(usuSeleccionado)
                    Mant.setFormMantenedor({ ...usuSeleccionado }, ['SexoDescripcion', 'Activo', 'Token', 'Roles']);
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
            debugger
            let usuario = ui.getUsuario();
            
            usuario = {
                ...usuario,
                Roles: usuario.Roles.map(rol => ({ Id: parseInt(rol) }))
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
                usuSeleccionado = {}
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
                AthenasNet.muestraToast({ mensaje: 'El usuario fue eliminado satisfactoriamente', titulo: 'Eliminación exitosa' })
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
        let lstRoles = await service.roles({});

        if (usuSeleccionado.Roles) {
            lstRoles = lstRoles.map(rol => {

                const encontrado = usuSeleccionado.Roles.find((rolUsuario) => {
                    return (rolUsuario.Id === rol.Id)
                })

                if (encontrado) {
                    return {
                        ...rol,
                        selected: true
                    }
                }
                else {
                    return {
                        ...rol,
                        selected: false
                    }
                }
            })
        }

        const tempRolData = {
            filas: lstRoles
        }
        console.log(lstRoles);
        AthenasNet.compilaTemplate(ui.ID_TEMP_ROL, tempRolData, ui.SEL_CBO_ROL);
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
