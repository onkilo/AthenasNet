using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AthenasNet.Api.Response
{
    public class GenericResponse<T>
    {
        public T Data { get; set; }

        public string Mensaje { get; set; }

        public bool Error { get; set; }

        public int Codigo { get; set; }
    }
}