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

            var response = ApiRequests.Cliente.GetAsync(url).Result;

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

            var response = ApiRequests.Cliente.PostAsJsonAsync(url, entidad).Result;

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

            var response = ApiRequests.Cliente.PutAsJsonAsync(url, entidad).Result;

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

            var response = ApiRequests.Cliente.DeleteAsync(url).Result;

            if (!response.IsSuccessStatusCode)
            {
                var errorData = response.Content.ReadAsAsync<K>();

                errorResponse = errorData.Result;

                return default(T);//null
            }

            var responseData = response.Content.ReadAsAsync<T>();

            return responseData.Result;
        }

        //public static GenericResponseModel<IEnumerable<T>> Get<T, K>(string url, out K errorResponse)
        //{

        //    errorResponse = default(K); // null

        //    var response = ApiRequests.Cliente.GetAsync(url).Result;

        //    if (!response.IsSuccessStatusCode)
        //    {
        //        var errorData = response.Content.ReadAsAsync<K>();

        //        errorResponse = errorData.Result;

        //        return default(T);//null
        //    }

        //    var responseData = response.Content.ReadAsAsync<T>();

        //    return responseData.Result;
        //}

        public static T GetWithHeader<T, K>(string url, out K errorResponse)
        {

            errorResponse = default(K); // null

            HttpRequestMessage request = BuildRequestWithToken(HttpMethod.Get, url);
            //request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "My token");
            //request.RequestUri = new Uri(ConfigurationManager.AppSettings["BASE_API_URL"] + url);
            //request.Method = HttpMethod.Get;

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


        public static T PostWithHeader<T, E, K>(string url, E entidad, out K errorResponse)
        {

            errorResponse = default(K); // null

            HttpRequestMessage request = BuildRequestWithToken(HttpMethod.Post, url, entidad);
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

        private static HttpRequestMessage BuildRequestWithToken(HttpMethod method, string url = "", Object entidad = null, string token = "")
        {
            HttpRequestMessage request = new HttpRequestMessage();
            request.RequestUri = new Uri(ConfigurationManager.AppSettings["BASE_API_URL"] + url);
            request.Method = method;

            if (token != "")
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
            
            if (method != HttpMethod.Get && entidad != null)
            {
                request.Content = new StringContent(JsonConvert.SerializeObject(entidad), Encoding.UTF8, "application/json");
            }
            return request;
        }
    }
}