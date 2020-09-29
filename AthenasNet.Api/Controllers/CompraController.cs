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
        // GET: api/Compra
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Compra/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Compra
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Compra/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Compra/5
        public void Delete(int id)
        {
        }
    }
}
