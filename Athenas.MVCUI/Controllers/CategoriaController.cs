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
    public class CategoriaController : Controller
    {
        GenericResponseModel<String> errorResponse;

        // GET: Categoria
        public ActionResult Index()
        {
            //String url = "Categoria";

            //url += "/2014";

            ////GenericResponseModel<IEnumerable<CategoriaViewModel>> responseModel = ApiRequests
            ////    .Get<GenericResponseModel<IEnumerable<CategoriaViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

            //GenericResponseModel<String> responseModel = ApiRequests
            //    .Delete<GenericResponseModel<String>, GenericResponseModel<String>>(url, out errorResponse);

            //if (errorResponse == null)
            //{
            //    Debug.Write(responseModel.Mensaje);
            //}
            //else
            //{
            //    Debug.Write(errorResponse);
            //}
            return View();
        }

        // GET: Categoria/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Categoria/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Categoria/Create
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

        // GET: Categoria/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Categoria/Edit/5
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

        // GET: Categoria/Delete/5
        public ActionResult Delete(int id)
        {
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
        public ActionResult Listar(string Descripcion = "")
        {

            String url = "Categoria?";

            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("registros","0");
            if(Descripcion != "") queryString.Add("Descripcion", Descripcion);

            url += queryString.ToString();

            GenericResponseModel<IEnumerable<CategoriaViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<CategoriaViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

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

            String url = $"Categoria/{Id}";

            GenericResponseModel<CategoriaViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<CategoriaViewModel>, GenericResponseModel<String>>(url, out errorResponse);

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
        public ActionResult Crear(CategoriaViewModel categoria)
        {

            String url = "Categoria";

            GenericResponseModel<String> responseModel = ApiRequests
                .Post<GenericResponseModel<String>,CategoriaViewModel, GenericResponseModel<String>>(url,categoria, out errorResponse);

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
        public ActionResult Actualizar(CategoriaViewModel categoria)
        {

            String url = $"Categoria/{categoria.Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Put<GenericResponseModel<String>, CategoriaViewModel, GenericResponseModel<String>>(url, categoria, out errorResponse);

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

            String url = $"Categoria/{Id}";

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
