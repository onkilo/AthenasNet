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
        // GET: api/Venta
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Venta/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Venta
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Venta/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Venta/5
        public void Delete(int id)
        {
        }
    }
}
