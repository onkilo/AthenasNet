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
    public class PromocionController : ApiController
    {
        private readonly PromocionServicio servicio = new PromocionServicio();
        // GET: api/Promocion
        public GenericResponse<IEnumerable<PromocionDto>> Get()
        {
            GenericResponse<IEnumerable<PromocionDto>> response = new GenericResponse<IEnumerable<PromocionDto>>();

            try
            {
                IEnumerable<PromocionDto> data = servicio.Listar("");
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

        // GET: api/Promocion/5
        public PromocionDto Get(int id)
        {
            return servicio.BuscarPorId(id);
        }

        // POST: api/Promocion
        public void Post([FromBody]PromocionDto promocion)
        {
            servicio.Crear(promocion);
        }

        // PUT: api/Promocion/5
        public void Put(int id, [FromBody]PromocionDto promocion)
        {
            promocion.Id = id;
            servicio.Actualizar(promocion);
        }

        // DELETE: api/Promocion/5
        public void Delete(int id)
        {
            servicio.Eliminar(id);
        }
    }
}
