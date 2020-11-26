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
using System.Web.Http;

namespace AthenasNet.Api.Controllers
{
    [CustomExceptionFilter]
    public class TrabajadorController : ApiController
    {
        TrabajadorServicio servicio = new TrabajadorServicio();


        // GET: api/Trabajador
        public GenericResponse<IEnumerable<TrabajadorDto>> Get(int pagina = 1, int registros = 10, string Nombre = "")
        {
            GenericResponse<IEnumerable<TrabajadorDto>> response = new GenericResponse<IEnumerable<TrabajadorDto>>();

            try
            {
                IEnumerable<TrabajadorDto> data = servicio.Listar(Nombre);
                response = ResponseUtil.GetListaPaginada<TrabajadorDto>(data, pagina, registros);
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }
            return response;
        }

        // GET: api/Trabajador/5
        public GenericResponse<TrabajadorDto> Get(int id)
        {
            GenericResponse<TrabajadorDto> response = new GenericResponse<TrabajadorDto>();
            try
            {
                TrabajadorDto data = servicio.BuscarPorId(id);
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

        // POST: api/Trabajador
        public GenericResponse<String> Post([FromBody]TrabajadorDto trabajador)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Crear(trabajador);
                response = ResponseUtil.CrearRespuestaOk(dataMsg: "El trabajador se creó satisfactoriamente");
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // PUT: api/Trabajador/5
        public GenericResponse<String> Put(int id, [FromBody]TrabajadorDto trabajador)
        {
            
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                trabajador.Id = id;
                servicio.Actualizar(trabajador);
                response = ResponseUtil.CrearRespuestaOk(dataMsg: "El trabajador se actualizado satisfactoriamente");
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        // DELETE: api/Trabajador/5
        public GenericResponse<String> Delete(int id)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Eliminar(id);
                response = ResponseUtil.CrearRespuestaOk(dataMsg: "El trabajador fue eliminado satisfactoriamente");
            }
            catch (Exception ex)
            {
                throw new CustomResponseException(ex.Message, 500);
            }

            return response;
        }

        [HttpPost]
        [Route("api/Trabajador/login")]
        public GenericResponse<TrabajadorDto> Login(LoginModel usuario)
        {
           
            GenericResponse<TrabajadorDto> response = new GenericResponse<TrabajadorDto>();
            try
            {
                TrabajadorDto trabajador = servicio.Login(new TrabajadorDto { Usuario = usuario.Usuario, Contrasenia = usuario.Contrasenia });

                if (trabajador != null)
                {
                    trabajador.Token = JwtUtil.CrearToken(trabajador.Id, trabajador.Usuario, trabajador.Roles);
                    TrabajadorDto data = trabajador;
                    response.Data = data;
                    response.Codigo = 200; // OK
                    response.Error = false;
                    response.Mensaje = "OK";
                }
                else
                {
                    throw new CustomResponseException("Credenciales incorrectas", 403);
                }
                
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
    }
}
