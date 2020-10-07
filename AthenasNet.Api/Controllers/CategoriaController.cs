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
using AthenasNet.Api.Excepciones;

namespace AthenasNet.Api.Controllers
{
    [CustomExceptionFilter]
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
                throw new CustomResponseException(ex.Message, 500);
            }
            
            return response;
        }

        // GET: api/Categoria/5
        public GenericResponse<CategoriaDto> Get(int id)
        {
            GenericResponse<CategoriaDto> response = new GenericResponse<CategoriaDto>();
            
            try
            {
                response.Data = servicio.BuscarPorId(id);
                if(response.Data == null)
                {
                    throw new CustomResponseException("No se encontró la categoría", 404);
                }
                response.Error = false;
                response.Mensaje = "Ok";
                response.Codigo = 200;
            }
            catch(CustomResponseException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }


            return response;
        }

        // POST: api/Categoria
        public GenericResponse<String> Post([FromBody]CategoriaDto categoria)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Crear(categoria);
                response = ResponseUtil.CrearRespuestaOk();
            }
            catch (CustomResponseException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }


            return response;
        }

        // PUT: api/Categoria/5
        public GenericResponse<String> Put(int id, [FromBody]CategoriaDto categoria)
        {
            
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                categoria.Id = id;
                servicio.Actualizar(categoria);
                response = ResponseUtil.CrearRespuestaOk();
            }
            catch (CustomResponseException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }


            return response;
        }

        // DELETE: api/Categoria/5
        public GenericResponse<String> Delete(int id)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Eliminar(id);
                response = ResponseUtil.CrearRespuestaOk();
            }
            catch (CustomResponseException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }


            return response;
        }
    }
}
