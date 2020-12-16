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
    public class UsuarioController : Controller
    {
        GenericResponseModel<String> errorResponse;
        string baseUrl = "Trabajador";
        // GET: Usuario
        public ActionResult Index()
        {
            ViewBag.Title = "Usuario";
            return View();
        }

        [HttpGet]
        public ActionResult Listar(string Nombre = "")
        {

            String url = $"{baseUrl}?";

            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("registros", "0");
            if (Nombre != "") queryString.Add("Nombre", Nombre);

            url += queryString.ToString();

            GenericResponseModel<IEnumerable<UsuarioViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<UsuarioViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

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

            GenericResponseModel<UsuarioViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<UsuarioViewModel>, GenericResponseModel<String>>(url, out errorResponse);

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
        public ActionResult Crear(UsuarioViewModel newUsuario)
        {

            GenericResponseModel<String> responseModel = ApiRequests
                .Post<GenericResponseModel<String>, UsuarioViewModel, GenericResponseModel<String>>(baseUrl, newUsuario, out errorResponse);

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
        public ActionResult Actualizar(UsuarioViewModel newUsuario)
        {

            String url = $"{baseUrl}/{newUsuario.Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Put<GenericResponseModel<String>, UsuarioViewModel, GenericResponseModel<String>>(url, newUsuario, out errorResponse);

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


        [HttpGet]
        public ActionResult Roles()
        {
            GenericResponseModel<IEnumerable<RolViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<RolViewModel>>, GenericResponseModel<String>>("Rol", out errorResponse);

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
        public ActionResult Login()
        {
            return View(new LoginViewModel());
        }

        [HttpPost]
        public ActionResult LoginPost(LoginViewModel login)
        {

            GenericResponseModel<UsuarioViewModel> responseModel = ApiRequests
                .Post<GenericResponseModel<UsuarioViewModel>, LoginViewModel, GenericResponseModel<String>>(baseUrl + "/login", login, out errorResponse);

            if(errorResponse == null)
            {

                UsuarioViewModel usuario = responseModel.Data;
                Session["usuario"] = usuario;
                Session["token"] = usuario.Token;
                Session["usuarioActual"] = usuario.Nombre + " " + usuario.Apellido;

                return RedirectToAction("Index", "Home");
            }
            else
            {
                return RedirectToAction("Login");
            }

        }

        [HttpGet]
        public ActionResult Logout()
        {
            Session["usuario"] = null;
            Session["token"] = null;
            Session["usuarioActual"] = null;

            return RedirectToAction("Login");
        }


        [CustomAutenticacionFilter(TipoResultado = "Json")]
        public ActionResult InfoPrincipal()
        {
            String url = $"{baseUrl}/InfoPrincipal";

            GenericResponseModel<IEnumerable<InfoPrincipalViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<InfoPrincipalViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

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
