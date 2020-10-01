using AthenasNet.Api.Response;
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
    public class ClienteController : ApiController
    {
        private readonly ClienteServicio servicio = new ClienteServicio();
        // GET: api/Cliente
        public GenericResponse<IEnumerable<ClienteDto>> Get()
        {
            GenericResponse<IEnumerable<ClienteDto>> response = new GenericResponse<IEnumerable<ClienteDto>>();

            try
            {
                IEnumerable<ClienteDto> data = servicio.Listar("");
                response.Data = data;
                response.Codigo = 200; // OK
                response.Error = false;
                response.Mensaje = "OK";
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Codigo = 500; // OK
                response.Error = true;
                response.Mensaje = ex.Message;
            }

            return response;
        }

        // GET: api/Cliente/5
        public ClienteDto Get(int id)
        {
            return servicio.BuscarPorId(id);
        }

        // POST: api/Cliente
        public void Post([FromBody]ClienteDto cliente)
        {
            servicio.Crear(cliente);
        }

        // PUT: api/Cliente/5
        public void Put(int id, [FromBody]ClienteDto cliente)
        {
            cliente.Id = id;
            servicio.Actualizar(cliente);
        }

        // DELETE: api/Cliente/5
        public void Delete(int id)
        {
            servicio.Eliminar(id);
        }
    }
}
