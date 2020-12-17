using Athenas.MVCUI.ClienteHttp;
using Athenas.MVCUI.Filters;
using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Controllers
{
    public class ProductoController : Controller
    {
        GenericResponseModel<String> errorResponse;

        // GET: Producto
        [CustomAuthenticationFilter(TipoResultado = "View")]
        public ActionResult Index()
        {
            ViewBag.Title = "Producto";
            return View();
        }

        [HttpGet]
        [CustomAuthenticationFilter(TipoResultado = "Json")]
        public ActionResult Listar(string Descripcion = "")
        {

            String url = "Producto?";

            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("registros", "0");
            if (Descripcion != "") queryString.Add("Descripcion", Descripcion);

            url += queryString.ToString();

            GenericResponseModel<IEnumerable<ProductoViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<ProductoViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public ActionResult Obtener(int Id)
        {

            String url = $"Producto/{Id}";

            GenericResponseModel<ProductoViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<ProductoViewModel>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public ActionResult Crear(ProductoViewModel producto)
        {

            String url = "Producto";

            GenericResponseModel<String> responseModel = ApiRequests
                .Post<GenericResponseModel<String>, ProductoViewModel, GenericResponseModel<String>>(url, producto, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public ActionResult Actualizar(ProductoViewModel producto)
        {

            String url = $"Producto/{producto.Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Put<GenericResponseModel<String>, ProductoViewModel, GenericResponseModel<String>>(url, producto, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public ActionResult Eliminar(int Id)
        {

            String url = $"Producto/{Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Delete<GenericResponseModel<String>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }
    }
}
