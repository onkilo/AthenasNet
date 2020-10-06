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
    public class CompraController : ApiController
    {
        private readonly CompraServicio servicio = new CompraServicio();
        // GET: api/Compra
        public IEnumerable<CompraDto> Get(string Proveedor = "")
        {
            return servicio.Listar(Proveedor, 0);
        }

        // GET: api/Compra/5
        public CompraDto Get(int id)
        {
            return servicio.BuscarPorId(id);
        }

        // POST: api/Compra
        public void Post([FromBody]CompraDto compra)
        {
            servicio.Crear(compra);
        }

        // PUT: api/Compra/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Compra/5
        public void Delete(int id)
        {
            servicio.Eliminar(id);
        }
    }
}
