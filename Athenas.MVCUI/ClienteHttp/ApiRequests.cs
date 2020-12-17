using Athenas.MVCUI.Models;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;

namespace Athenas.MVCUI.ClienteHttp
{
    public class ApiRequests
    {
        public static HttpClient Cliente { get; set; }

        public static void Configurar()
        {
            Cliente = new HttpClient();
            Cliente.BaseAddress = new Uri(ConfigurationManager.AppSettings["BASE_API_URL"]);
            Cliente.DefaultRequestHeaders.Accept.Clear();
            Cliente.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // POST GET PUT DELETE
        public static T Get<T,K>(string url, out K errorResponse)
        {

            errorResponse = default(K); // null

            var request = CreaPeticion(HttpMethod.Get, url, null);

            var response = ApiRequests.Cliente.SendAsync(request).Result;

            if (!response.IsSuccessStatusCode)
            {
                var errorData = response.Content.ReadAsAsync<K>();

                errorResponse = errorData.Result;

                return default(T);//null
            }

            var responseData = response.Content.ReadAsAsync<T>();

            return responseData.Result;
        }

        public static T Post<T,E, K>(string url, E entidad, out K errorResponse)
        {

            errorResponse = default(K); // null

            var request = CreaPeticion(HttpMethod.Post, url, entidad);

            var response = ApiRequests.Cliente.SendAsync(request).Result;


            if (!response.IsSuccessStatusCode)
            {
                var errorData = response.Content.ReadAsAsync<K>();

                errorResponse = errorData.Result;

                return default(T);//null
            }

            var responseData = response.Content.ReadAsAsync<T>();

            return responseData.Result;
        }

        public static T Put<T, E, K>(string url, E entidad, out K errorResponse)
        {

            errorResponse = default(K); // null

            var request = CreaPeticion(HttpMethod.Put, url, entidad);

            var response = ApiRequests.Cliente.SendAsync(request).Result;

            if (!response.IsSuccessStatusCode)
            {
                var errorData = response.Content.ReadAsAsync<K>();

                errorResponse = errorData.Result;

                return default(T);//null
            }

            var responseData = response.Content.ReadAsAsync<T>();

            return responseData.Result;
        }

        public static T Delete<T, K>(string url, out K errorResponse)
        {

            errorResponse = default(K); // null

            var request = CreaPeticion(HttpMethod.Delete, url);

            var response = ApiRequests.Cliente.SendAsync(request).Result;

            if (!response.IsSuccessStatusCode)
            {
                var errorData = response.Content.ReadAsAsync<K>();

                errorResponse = errorData.Result;

                return default(T);//null
            }

            var responseData = response.Content.ReadAsAsync<T>();

            return responseData.Result;
        }

        public static T Patch<T, E, K>(string url, E entidad, out K errorResponse)
        {

            errorResponse = default(K); // null

            var request = CreaPeticion(new HttpMethod("PATCH"), url, entidad);

            var response = ApiRequests.Cliente.SendAsync(request).Result;

            if (!response.IsSuccessStatusCode)
            {
                var errorData = response.Content.ReadAsAsync<K>();

                errorResponse = errorData.Result;

                return default(T);//null
            }

            var responseData = response.Content.ReadAsAsync<T>();

            return responseData.Result;
        }

        //RequestMessage => Authorization Bearer sdcsdcsdcsc

        private static HttpRequestMessage CreaPeticion(HttpMethod metodo, string url = "", Object entidad = null)
        {
            HttpRequestMessage request = new HttpRequestMessage();
            request.Method = metodo;
            request.RequestUri = new Uri(ConfigurationManager.AppSettings["BASE_API_URL"] + url);

            HttpContext context = HttpContext.Current;
            if (context.Session["usuario"] != null)
            {
                string token = ((UsuarioViewModel)context.Session["usuario"]).Token;
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            if (entidad != null)
            {
                request.Content = new StringContent(JsonConvert.SerializeObject(entidad), Encoding.UTF8, "application/json");
            }

            return request;
        }
    }
}