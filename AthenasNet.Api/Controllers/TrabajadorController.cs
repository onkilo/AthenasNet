using AthenasNet.Api.Filters;
using AthenasNet.Api.Models;
using AthenasNet.Api.Utilitarios;
using AthenasNet.Negocio.Dto;
using AthenasNet.Negocio.Servicio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AthenasNet.Api.Controllers
{
    public class TrabajadorController : ApiController
    {
        TrabajadorServicio servicio = new TrabajadorServicio();


        // GET: api/Trabajador
        //[CustomAutorizacionFilter("Administrador,Vendedor")]
        public IEnumerable<TrabajadorDto> Get()
        {
            return servicio.Listar("");
        }

        // GET: api/Trabajador/5
        public TrabajadorDto Get(int id)
        {
            return servicio.BuscarPorId(id);
        }

        // POST: api/Trabajador
        public void Post([FromBody]TrabajadorDto trabajador)
        {
            servicio.Crear(trabajador);
        }

        // PUT: api/Trabajador/5
        public void Put(int id, [FromBody]TrabajadorDto trabajador)
        {
            trabajador.Id = id;
            servicio.Actualizar(trabajador);
        }

        // DELETE: api/Trabajador/5
        public void Delete(int id)
        {
        }

        [HttpPost]
        [Route("api/Trabajador/login")]
        public TrabajadorDto Login(LoginModel usuario)
        {
            TrabajadorDto trabajador = servicio.Login(new TrabajadorDto { Usuario = usuario.Usuario, Contrasenia = usuario.Contrasenia });

            if (trabajador != null)
            {
                trabajador.Token = JwtUtil.CrearToken(trabajador.Id, trabajador.Usuario, trabajador.Roles);
            }
            
            return trabajador;
        }
    }
}
