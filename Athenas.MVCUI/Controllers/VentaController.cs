using Athenas.MVCUI.ClienteHttp;
using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Controllers
{
    public class VentaController : Controller
    {
        // GET: Venta
        GenericResponseModel<String> errorResponse;
        string baseUrl = "Venta";

        // GET: Pedido
        public ActionResult Index()
        {
            return View();
        }

        // GET: Venta/Create
        public ActionResult Create()
        {
            return View(new VentaViewModel());
        }

        [HttpGet]
        public ActionResult Listar(string Cliente = "")
        {

            String url = $"{baseUrl}?";

            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("registros", "0");
            if (Cliente != "") queryString.Add("Cliente", Cliente);

            url += queryString.ToString();

            GenericResponseModel<IEnumerable<VentaViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<VentaViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

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

            String url = $"{baseUrl}/{Id}";

            GenericResponseModel<VentaViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<VentaViewModel>, GenericResponseModel<String>>(url, out errorResponse);

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
        public ActionResult Crear(VentaViewModel venta)
        {

            GenericResponseModel<String> responseModel = ApiRequests
                .Post<GenericResponseModel<String>, VentaViewModel, GenericResponseModel<String>>(baseUrl, venta, out errorResponse);

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
        public ActionResult Actualizar(VentaViewModel venta)
        {

            String url = $"{baseUrl}/{venta.Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Put<GenericResponseModel<String>, VentaViewModel, GenericResponseModel<String>>(url, venta, out errorResponse);

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

            String url = $"{baseUrl}/{Id}";

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
