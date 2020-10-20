using AthenasNet.Api.Excepciones;
using AthenasNet.Api.Filters;
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
    [CustomExceptionFilter]
    public class CompraController : ApiController
    {
        private readonly CompraServicio servicio = new CompraServicio();

        public GenericResponse<IEnumerable<CompraDto>> Get(int pagina = 1, int registros = 10, string proveedor = "", int id = 0)
        {
            GenericResponse<IEnumerable<CompraDto>> response = new GenericResponse<IEnumerable<CompraDto>>();

            try
            {
                IEnumerable<CompraDto> data = servicio.Listar(proveedor, id);
                response = ResponseUtil.GetListaPaginada<CompraDto>(data, pagina, registros);
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }
        // GET: api/Compra/5
        public GenericResponse<CompraDto> Get(int id)
        {
            GenericResponse<CompraDto> response = new GenericResponse<CompraDto>();

            try
            {
                response.Data = servicio.BuscarPorId(id);
                if (response.Data == null)
                {
                    throw new CustomResponseException("No se encontró la compra", 404);
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

        // POST: api/Compra
        public GenericResponse<String> Post([FromBody]CompraDto compra)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Crear(compra);
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

        // PUT: api/Compra/5
        public GenericResponse<String> Put(int id, [FromBody]CompraDto compra)
        {

            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                compra.Id = id;
                servicio.Actualizar(compra);
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

        // DELETE: api/Compra/5
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
