using AthenasNet.Api.Excepciones;
using AthenasNet.Api.Response;
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
    public class RolController : ApiController
    {
        private readonly RolServicio servicio = new RolServicio();

        // GET: api/Rol
        public GenericResponse<IEnumerable<RolDto>> Get()
        {
            GenericResponse<IEnumerable<RolDto>> response = new GenericResponse<IEnumerable<RolDto>>();

            try
            {
                IEnumerable<RolDto> data = servicio.Listar();
                response = ResponseUtil.GetListaPaginada<RolDto>(data);
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        //// GET: api/Rol/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Rol
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT: api/Rol/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/Rol/5
        //public void Delete(int id)
        //{
        //}
    }
}
