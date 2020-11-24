using Athenas.MVCUI.ClienteHttp;
using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Controllers
{
    public class SeguridadController : Controller
    {
        GenericResponseModel<String> errorResponse;

        // GET: Seguridad
        public ActionResult Index()
        {
            return View(new LoginViewModel());
        }

        [HttpPost]
        public ActionResult Login(LoginViewModel login)
        {
            String url = $"Trabajador/Login";

            GenericResponseModel<UsuarioViewModel> responseModel = ApiRequests
           .Post<GenericResponseModel<UsuarioViewModel>, LoginViewModel, GenericResponseModel<String>>(url, login, out errorResponse);


            if (responseModel != null && errorResponse == null)
            {
                

                Session["usuario"] = responseModel.Data;
                Session["usuarioActual"] = responseModel.Data.Nombre + " " + responseModel.Data.Apellido; 
                return RedirectToAction("Index", "Home");
            }

            ViewBag.ErrorMessage = "Credenciales incorrectas";

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult Logout()
        {
            Session["usuario"] = null;

            return RedirectToAction("Index");
        }

        // GET: Seguridad/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Seguridad/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Seguridad/Create
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

        // GET: Seguridad/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Seguridad/Edit/5
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

        // GET: Seguridad/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Seguridad/Delete/5
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
    }
}
