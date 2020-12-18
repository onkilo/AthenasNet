const InicioController = (usuarioService, ui) => {

    let infoPrincipal = {};

    const muestraInfoPrincipal = async () => {
        infoPrincipal = await usuarioService.infoPrincipal();

        console.log(infoPrincipal);
    }

    const iniciar = () => {
        muestraInfoPrincipal();
    }

    return {
        iniciar
    }
}