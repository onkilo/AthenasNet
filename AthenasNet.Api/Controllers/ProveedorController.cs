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
    public class ProveedorController : ApiController
    {
        private readonly ProveedorServicio servicio = new ProveedorServicio();

        // GET: api/Proveedor
        public GenericResponse<IEnumerable<ProveedorDto>> Get(int pagina = 1, int registros = 10, string RzSocial = "")
        {
             GenericResponse<IEnumerable<ProveedorDto>> response = new GenericResponse<IEnumerable<ProveedorDto>>();

            try
            {
                //IEnumerable<ProveedorDto> data = servicio.Listar("");
                //response.Data = data;
                //response.Codigo = 200; // OK
                //response.Error = false;
                //response.Mensaje = "OK";
                IEnumerable<ProveedorDto> data = servicio.Listar(RzSocial);
                response = ResponseUtil.GetListaPaginada<ProveedorDto>(data, pagina, registros);
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
        
        public GenericResponse<ProveedorDto> Get(int id)
        {
            GenericResponse<ProveedorDto> response = new GenericResponse<ProveedorDto>();

            try
            {
                response.Data = servicio.BuscarPorId(id);
                if (response.Data == null)
                {
                    throw new CustomResponseException("No se encontró el proveedor", 404);
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

        // POST: api/Proveedor
        public GenericResponse<String> Post([FromBody]ProveedorDto proveedor)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Crear(proveedor);
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


        // PUT: api/Proveedor/5
        public GenericResponse<String> Put(int id, [FromBody]ProveedorDto proveedor)
        {

            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                proveedor.Id = id;
                servicio.Actualizar(proveedor);
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

        // DELETE: api/Proveedor/5
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
