using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AthenasNet.Api.Excepciones
{
    public class CustomResponseException : Exception
    {
        public int HttpCode { get; set; }

        public CustomResponseException(String msg, int httpCode) : base(msg)
        {
            HttpCode = httpCode;
        }
    }
}