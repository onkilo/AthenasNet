using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AthenasNet.Negocio.Servicio;
using AthenasNet.Negocio.Dto;
using AthenasNet.Api.Response;
using AthenasNet.Api.Utilitarios;
using AthenasNet.Api.Filters;

namespace AthenasNet.Api.Controllers
{
    public class CategoriaController : ApiController
    {
        private readonly CategoriaServicio servicio = new CategoriaServicio();

        // GET: api/Categoria
        //[CustomAutenticacionFilter]
        //[CustomAutorizacionFilter("Administrador, Supervisor")]
        public GenericResponse<IEnumerable<CategoriaDto>> Get(int pagina = 1, int registros = 10, string descripcion = "")
        {
            GenericResponse<IEnumerable<CategoriaDto>> response = new GenericResponse<IEnumerable<CategoriaDto>>();

            try
            {
                IEnumerable<CategoriaDto> data = servicio.Listar(descripcion);
                response = ResponseUtil.GetListaPaginada<CategoriaDto>(data, pagina, registros);
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

        // GET: api/Categoria/5
        public CategoriaDto Get(int id)
        {
            return servicio.BuscarPorId(id);
        }

        // POST: api/Categoria
        public void Post([FromBody]CategoriaDto categoria)
        {
            servicio.Crear(categoria);
        }

        // PUT: api/Categoria/5
        public void Put(int id, [FromBody]CategoriaDto categoria)
        {
            categoria.Id = id;
            servicio.Actualizar(categoria);
        }

        // DELETE: api/Categoria/5
        public void Delete(int id)
        {
            servicio.Eliminar(id);
        }
    }
}
