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
    public class VentaController : ApiController
    {
        private readonly VentaServicio servicio = new VentaServicio();
        // GET: api/Venta
        public IEnumerable<VentaDto> Get(string Cliente = "")
        {
            return servicio.Listar(Cliente, 0);
        }

        // GET: api/Venta/5
        public VentaDto Get(int id)
        {
            return servicio.BuscarPorId(id);
        }

        // POST: api/Venta
        public void Post([FromBody]VentaDto venta)
        {
            servicio.Crear(venta);
        }

        //// PUT: api/Venta/5
        //public void Put(int id, [FromBody]string cliente)
        //{
        //}

        // DELETE: api/Venta/5
        public void Delete(int id)
        {
            servicio.Eliminar(id);
        }
    }
}
