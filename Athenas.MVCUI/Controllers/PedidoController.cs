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
    public class PedidoController : Controller
    {
        GenericResponseModel<String> errorResponse;
        string baseUrl = "Compra";
        // GET: Pedido
        public ActionResult Index()
        {
            return View();
        }

        

        // GET: Pedido/Create
        public ActionResult Create()
        {
            return View();
        }

        

        // GET: Pedido/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }




        [HttpGet]
        public ActionResult Listar(string Nombre = "")
        {
            string url = $"{baseUrl}?";
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
        public ActionResult Roles()
        {
            GenericResponseModel<IEnumerable<UsuarioViewModel>> responseModel = ApiRequests
                 .Get<GenericResponseModel<IEnumerable<UsuarioViewModel>>, GenericResponseModel<String>>("Rol", out errorResponse);

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

            //String url = "Producto";

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
    }
}
