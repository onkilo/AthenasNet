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
    public class ProveedorController : ApiController
    {
        private readonly ProveedorServicio servicio = new ProveedorServicio();

        // GET: api/Proveedor
        public GenericResponse<IEnumerable<ProveedorDto>> Get()
        {
             GenericResponse<IEnumerable<ProveedorDto>> response = new GenericResponse<IEnumerable<ProveedorDto>>();

            try
            {
                IEnumerable<ProveedorDto> data = servicio.Listar("");
                response.Data = data;
                response.Codigo = 200; // OK
                response.Error = false;
                response.Mensaje = "OK";
            }
            catch(Exception ex)
            {
                response.Data = null;
                response.Codigo = 500; // OK
                response.Error = true;
                response.Mensaje = ex.Message;
            }
            
            return response;
        }

        // GET: api/Proveedor/5
        public ProveedorDto Get(int id)
        {
            return servicio.BuscarPorId(id);
        }

        // POST: api/Proveedor
        public void Post([FromBody]ProveedorDto proveedor)
        {
            servicio.Crear(proveedor);
        }

        // PUT: api/Proveedor/5
        public void Put(int id, [FromBody]ProveedorDto proveedor)
        {
            proveedor.Id = id;
            servicio.Actualizar(proveedor);
        }

        // DELETE: api/Proveedor/5
        public void Delete(int id)
        {
            servicio.Eliminar(id);
        }
    }
}
