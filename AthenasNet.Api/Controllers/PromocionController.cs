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
    public class PromocionController : ApiController
    {
        private readonly PromocionServicio servicio = new PromocionServicio();
        // GET: api/Promocion
        public GenericResponse<IEnumerable<PromocionDto>> Get(int pagina = 1, int registros = 10, string Producto = "", int Estado = 0)
        {
            GenericResponse<IEnumerable<PromocionDto>> response = new GenericResponse<IEnumerable<PromocionDto>>();

            try
            {
                IEnumerable<PromocionDto> data = servicio.Listar(Producto, Estado);
                response = ResponseUtil.GetListaPaginada<PromocionDto>(data, pagina, registros);
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // GET: api/Promocion/5
        public GenericResponse<PromocionDto> Get(int id)
        {
            GenericResponse<PromocionDto> response = new GenericResponse<PromocionDto>();

            try
            {
                PromocionDto data = servicio.BuscarPorId(id);
                response.Data = data;
                response.Codigo = 200; // OK
                response.Error = false;
                response.Mensaje = "OK";
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // POST: api/Promocion
        public GenericResponse<String> Post([FromBody]PromocionDto promocion)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                

                servicio.Crear(promocion);
                response = ResponseUtil.CrearRespuestaOk(dataMsg: "La promoción se creó satisfactoriamente");
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // PUT: api/Promocion/5
        public GenericResponse<String> Put(int id, [FromBody]PromocionDto promocion)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                promocion.Id = id;
                servicio.Actualizar(promocion);
                response = ResponseUtil.CrearRespuestaOk(dataMsg: "La promoción se actualizó satisfactoriamente");
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // DELETE: api/Promocion/5
        public GenericResponse<String> Delete(int id)
        {
            
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Eliminar(id);
                response = ResponseUtil.CrearRespuestaOk(dataMsg: "La promoción se eliminó satisfactoriamente");
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }
    }
}
