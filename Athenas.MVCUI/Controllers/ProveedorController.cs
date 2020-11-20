using Athenas.MVCUI.ClienteHttp;
using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Controllers
{
    public class ProveedorController : Controller
    {
        GenericResponseModel<String> errorResponse;

        // GET: Categoria
        public ActionResult Index()
        {
            ViewBag.Title = "Proveedor";
            return View();
        }



        // POST: Categoria/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }


        [HttpGet]
        public ActionResult Listar(string RzSocial = "")
        {

            String url = "Proveedor?";
            
            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("registros", "0");
            if (RzSocial != "") queryString.Add("RzSocial", RzSocial);

            url += queryString.ToString();

            GenericResponseModel<IEnumerable<ProveedorViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<ProveedorViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

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

            String url = $"Proveedor/{Id}";

            GenericResponseModel<ProveedorViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<ProveedorViewModel>, GenericResponseModel<String>>(url, out errorResponse);

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
        public ActionResult Crear(ProveedorViewModel proveedor)
        {

            String url = "Proveedor";

            GenericResponseModel<String> responseModel = ApiRequests
                .Post<GenericResponseModel<String>, ProveedorViewModel, GenericResponseModel<String>>(url, proveedor, out errorResponse);

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
        public ActionResult Actualizar(ProveedorViewModel proveedor)
        {

            String url = $"Proveedor/{proveedor.Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Put<GenericResponseModel<String>, ProveedorViewModel, GenericResponseModel<String>>(url, proveedor, out errorResponse);

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

            String url = $"Proveedor/{Id}";

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
