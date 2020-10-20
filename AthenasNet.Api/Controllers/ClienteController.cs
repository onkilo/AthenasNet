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
    public class ClienteController : ApiController
    {
        private readonly ClienteServicio servicio = new ClienteServicio();
        // GET: api/Cliente
        public GenericResponse<IEnumerable<ClienteDto>> Get(int pagina = 1, int registros = 10, string nombre = "")
        {
            GenericResponse<IEnumerable<ClienteDto>> response = new GenericResponse<IEnumerable<ClienteDto>>();

            try
            {
                //IEnumerable<ClienteDto> data = servicio.Listar("");
                //response.Data = data;
                //response.Codigo = 200; // OK
                //response.Error = false;
                //response.Mensaje = "OK";
                IEnumerable<ClienteDto> data = servicio.Listar(nombre);
                response = ResponseUtil.GetListaPaginada<ClienteDto>(data, pagina, registros);
            }
            catch (Exception ex)
            {
                //    response.Data = null;
                //    response.Codigo = 500; // OK
                //    response.Error = true;
                //    response.Mensaje = ex.Message;
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // GET: api/Cliente/5
        public GenericResponse<ClienteDto> Get(int id)
        {
            GenericResponse<ClienteDto> response = new GenericResponse<ClienteDto>();

            try
            {
                response.Data = servicio.BuscarPorId(id);
                if (response.Data == null)
                {
                    throw new CustomResponseException("No se encontró al cliente", 404);
                }
                response.Error = false;
                response.Mensaje = "Ok";
                response.Codigo = 200;
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

        // POST: api/Cliente
        public GenericResponse<String> Post([FromBody]ClienteDto cliente)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Crear(cliente);
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

        // PUT: api/Cliente/5
        public GenericResponse<String> Put(int id, [FromBody]ClienteDto cliente)
        {

            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                cliente.Id = id;
                servicio.Actualizar(cliente);
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

        // DELETE: api/Cliente/5
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
