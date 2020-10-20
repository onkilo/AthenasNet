using Athenas.MVCUI.ClienteHttp;
using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Controllers
{
    public class ProveedorController : Controller
    {
        GenericResponseModel<String> errorResponse;
        // GET: Proveedor
        public ActionResult Index()
        {
            String url = "Proveedor";

            url += "/2014";

            //GenericResponseModel<IEnumerable<CategoriaViewModel>> responseModel = ApiRequests
            //    .Get<GenericResponseModel<IEnumerable<CategoriaViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

            GenericResponseModel<String> responseModel = ApiRequests
                .Delete<GenericResponseModel<String>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                Debug.Write(responseModel.Mensaje);
            }
            else
            {
                Debug.Write(errorResponse);
            }
            return View();
        }

        // GET: Proveedor/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Proveedor/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Proveedor/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Proveedor/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Proveedor/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Proveedor/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Proveedor/Delete/5
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

            String url = "Proveedor";

            url += "?registros=0";

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
    }
}
