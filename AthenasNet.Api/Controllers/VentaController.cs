using AthenasNet.Api.Excepciones;
using AthenasNet.Api.Filters;
using AthenasNet.Api.Models;
using AthenasNet.Api.Response;
using AthenasNet.Api.Utilitarios;
using AthenasNet.Negocio.Dto;
using AthenasNet.Negocio.Servicio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace AthenasNet.Api.Controllers
{
    [CustomExceptionFilter]
    [CustomAutenticacionFilter]
    public class VentaController : ApiController
    {
        private readonly VentaServicio servicio = new VentaServicio();
        // GET: api/Venta
        public GenericResponse<IEnumerable<VentaDto>> Get(int pagina = 1, int registros = 10, string Cliente = "")
        {
            

            GenericResponse<IEnumerable<VentaDto>> response = new GenericResponse<IEnumerable<VentaDto>>();

            try
            {
                bool esVendedor = false;

                esVendedor = UsuarioUtil.EsVendedor();

                int usuarioId = esVendedor ? UsuarioUtil.GetUsuarioActual().Id : 0;

                IEnumerable<VentaDto> data = servicio.Listar(Cliente, usuarioId);
                response = ResponseUtil.GetListaPaginada<VentaDto>(data, pagina, registros);
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // GET: api/Venta/5
        public GenericResponse<VentaDto> Get(int id)
        {
            
            GenericResponse<VentaDto> response = new GenericResponse<VentaDto>();

            try
            {
                JwtDecodeModel usuarioActual = UsuarioUtil.GetUsuarioActual();

                bool esVendedor = UsuarioUtil.EsVendedor();

                
                response.Data = servicio.BuscarPorId(id);

                if (esVendedor && response.Data.Trabajador.Id != usuarioActual.Id)
                {
                    throw new CustomResponseException("No estas autorizado para realizar esta acción", 400);
                }

                if (response.Data == null)
                {
                    throw new CustomResponseException("No se encontró la venta", 404);
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

        // POST: api/Venta
        public GenericResponse<String> Post([FromBody]VentaDto venta)
        {
            
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Crear(venta);
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

        //// PUT: api/Venta/5
        //public void Put(int id, [FromBody]string cliente)
        //{
        //}

        // DELETE: api/Venta/5
        public GenericResponse<String> Delete(int id)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                JwtDecodeModel usuarioActual = UsuarioUtil.GetUsuarioActual();

                bool esVendedor = UsuarioUtil.EsVendedor();


                VentaDto venta = servicio.BuscarPorId(id);

                if (esVendedor && venta.Trabajador.Id != usuarioActual.Id)
                {
                    throw new CustomResponseException("No estas autorizado para realizar esta acción", 400);
                }

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
