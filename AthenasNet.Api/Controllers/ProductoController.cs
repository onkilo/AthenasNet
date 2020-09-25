using AthenasNet.Api.Excepciones;
using AthenasNet.Api.Filters;
using AthenasNet.Api.Response;
using AthenasNet.Api.Utilitarios;
using AthenasNet.Negocio.Dto;
using AthenasNet.Negocio.Servicio;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AthenasNet.Api.Controllers
{
    public class ProductoController : ApiController
    {
        private ProductoServicio servicio = new ProductoServicio();
        private CloudinaryUtil cloudinaryUtil = new CloudinaryUtil();


        // GET: api/Producto
        [CustomExceptionFilter]
        public GenericResponse<IEnumerable<ProductoDto>> Get()
        {
            GenericResponse<IEnumerable<ProductoDto>> response = new GenericResponse<IEnumerable<ProductoDto>>();

            try
            {
                IEnumerable<ProductoDto> data = servicio.Listar("");
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

        // GET: api/Producto/5
        public GenericResponse<ProductoDto> Get(int id)
        {
            GenericResponse<ProductoDto> response = new GenericResponse<ProductoDto>();

            try
            {
                ProductoDto data = servicio.BuscarPorId(id);
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

        // POST: api/Producto
        public GenericResponse<String> Post([FromBody]ProductoDto producto)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                producto.Imagen = cloudinaryUtil.SubeImagen(producto.Base64Imagen, producto.Descripcion);

                servicio.Crear(producto);
                response.Data = "Se creó correctamente";
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

        // PUT: api/Producto/5
        public GenericResponse<String> Put(int id, [FromBody]ProductoDto producto)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {

                ProductoDto prodActual = servicio.BuscarPorId(id);

                if(producto.Base64Imagen != null && producto.Base64Imagen != "")
                {
                    producto.Imagen = cloudinaryUtil.SubeImagen(producto.Base64Imagen, producto.Descripcion);
                }
                else
                {
                    producto.Imagen = prodActual.Imagen;
                }

                producto.Id = id;
                servicio.Actualizar(producto);
                response.Data = "Se actualizó correctamente";
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

        // DELETE: api/Producto/5
        public GenericResponse<String> Delete(int id)
        {
            GenericResponse<String> response = new GenericResponse<String>();

            try
            {
                servicio.Eliminar(id);
                response.Data = "Se eliminó correctamente";
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
    }
}
