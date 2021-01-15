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
    public class PromocionController : Controller
    {
        GenericResponseModel<String> errorResponse;
        string urlBase = "Promocion";
        // GET: Promocion
        public ActionResult Index()
        {
            ViewBag.Title = "Promoción";
            return View();
        }


        [HttpGet]
        public ActionResult Listar(string Producto = "")
        {

            String url = urlBase + "?";

            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("registros", "0");
            if (Producto != "") queryString.Add("Producto", Producto);

            url += queryString.ToString();

            GenericResponseModel<IEnumerable<PromocionViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<PromocionViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

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

            String url = $"{urlBase}/{Id}";

            GenericResponseModel<PromocionViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<PromocionViewModel>, GenericResponseModel<String>>(url, out errorResponse);

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
        public ActionResult Crear(PromocionViewModel promocion)
        {

            GenericResponseModel<String> responseModel = ApiRequests
                .Post<GenericResponseModel<String>, PromocionViewModel, GenericResponseModel<String>>(urlBase, promocion, out errorResponse);

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
        public ActionResult Actualizar(PromocionViewModel promocion)
        {

            String url = $"{urlBase}/{promocion.Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Put<GenericResponseModel<String>, PromocionViewModel, GenericResponseModel<String>>(url, promocion, out errorResponse);

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

            String url = $"{urlBase}/{Id}";

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

        [HttpGet]
        public ActionResult Tienepromociones(int Producto = 0, string FechaInicio = "", string FechaFin = "", int Promocion = 0)
        {

            String url = $"{urlBase}/TienePromociones?";

            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("Producto", Producto.ToString());
            queryString.Add("FechaInicio", FechaInicio);
            queryString.Add("FechaFin", FechaFin);
            queryString.Add("Promocion", Promocion.ToString());
           

            url += queryString.ToString();

            GenericResponseModel<Boolean> responseModel = ApiRequests
                .Get<GenericResponseModel<Boolean>, GenericResponseModel<String>>(url, out errorResponse);

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
