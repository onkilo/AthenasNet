using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Athenas.MVCUI.ClienteHttp
{
    public class ApiRequests
    {
        public static HttpClient Cliente { get; set; }

        public static void Configurar()
        {
            Cliente.BaseAddress = new Uri(ConfigurationManager.AppSettings["BASE_API_URL"]);
            Cliente.DefaultRequestHeaders.Accept.Clear();
            Cliente.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }


    }
}